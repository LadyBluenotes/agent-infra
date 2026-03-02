import fs from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

const repoRoot = new URL("../", import.meta.url).pathname;
const skillsRoot = path.join(repoRoot, "skills");

const STOPWORDS = new Set([
  "the",
  "and",
  "or",
  "for",
  "with",
  "without",
  "from",
  "into",
  "when",
  "this",
  "that",
  "these",
  "those",
  "use",
  "using",
  "used",
  "how",
  "what",
  "why",
  "a",
  "an",
  "to",
  "of",
  "in",
  "on",
  "by",
  "before",
  "after",
  "during",
  "about",
  "as",
  "is",
  "are",
  "be",
  "can",
  "should",
  "will",
  "may",
  "then",
  "than",
  "not",
]);

const META_SPEC = `# Skill Meta Spec

This directory is generated. Do not edit by hand.

- Source: skills in this category
- Format: meta/write-a-skill/SKILL.md
`;

const normalizeToken = (token) =>
  token
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .trim();

const extractFrontmatter = (content) => {
  if (!content.startsWith("---")) return null;
  const end = content.indexOf("\n---", 3);
  if (end === -1) return null;
  const raw = content.slice(3, end).trim();
  return { data: YAML.parse(raw), body: content.slice(end + 4) };
};

const extractHeadings = (body) => {
  return body
    .split("\n")
    .filter((line) => line.startsWith("#"))
    .map((line) => line.replace(/^#+\s*/, "").trim());
};

const extractKeywords = (frontmatter, headings) => {
  const sources = [
    frontmatter?.description ?? "",
    headings.join(" "),
    frontmatter?.library ?? "",
  ];
  const tokens = sources
    .join(" ")
    .split(/\s+/)
    .map(normalizeToken)
    .filter((token) => token && !STOPWORDS.has(token));

  const unique = [];
  for (const token of tokens) {
    if (!unique.includes(token)) unique.push(token);
    if (unique.length >= 12) break;
  }
  return unique;
};

const listSkillFiles = async (categoryDir) => {
  const entries = await fs.readdir(categoryDir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = path.join(categoryDir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "_meta") continue;
      const nested = await listSkillFiles(fullPath);
      results.push(...nested);
      continue;
    }
    if (!entry.name.endsWith(".md")) continue;
    if (entry.name === "index.md") continue;
    results.push(fullPath);
  }
  return results;
};

const buildDomainMap = async (categoryDir, categoryName) => {
  const files = await listSkillFiles(categoryDir);
  const skills = [];

  for (const file of files) {
    const content = await fs.readFile(file, "utf8");
    const frontmatter = extractFrontmatter(content);
    if (!frontmatter?.data?.name) continue;
    const headings = extractHeadings(frontmatter.body);
    const keywords = extractKeywords(frontmatter.data, headings);

    const relativePath = path.relative(repoRoot, file).replace(/\\/g, "/");

    skills.push({
      id: frontmatter.data.name,
      path: relativePath,
      description: frontmatter.data.description ?? "",
      keywords,
      related: frontmatter.data.related ?? [],
      load_with: frontmatter.data.load_with ?? [],
    });
  }

  return {
    version: 1,
    category: categoryName,
    generated_at: new Date().toISOString(),
    skills,
  };
};

const ensureMetaDir = async (categoryDir) => {
  const metaDir = path.join(categoryDir, "_meta");
  await fs.mkdir(metaDir, { recursive: true });
  return metaDir;
};

const readYamlIfExists = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return { content, data: YAML.parse(content) };
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw error;
  }
};

const readTextIfExists = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return { content };
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw error;
  }
};

const stableStringify = (value) => JSON.stringify(value);

const categories = await fs.readdir(skillsRoot, { withFileTypes: true });

for (const entry of categories) {
  if (!entry.isDirectory()) continue;
  const categoryName = entry.name;
  const categoryDir = path.join(skillsRoot, categoryName);
  const metaDir = await ensureMetaDir(categoryDir);
  const domainMap = await buildDomainMap(categoryDir, categoryName);
  const domainMapPath = path.join(metaDir, "domain_map.yaml");
  const existingDomainMap = await readYamlIfExists(domainMapPath);

  if (existingDomainMap?.data) {
    const prevComparable = {
      version: existingDomainMap.data.version,
      category: existingDomainMap.data.category,
      skills: existingDomainMap.data.skills,
    };
    const nextComparable = {
      version: domainMap.version,
      category: domainMap.category,
      skills: domainMap.skills,
    };

    if (stableStringify(prevComparable) === stableStringify(nextComparable)) {
      domainMap.generated_at = existingDomainMap.data.generated_at;
    }
  }

  const domainMapContent = YAML.stringify(domainMap);
  if (existingDomainMap?.content !== domainMapContent) {
    await fs.writeFile(domainMapPath, domainMapContent, "utf8");
  }

  const skillSpecPath = path.join(metaDir, "skill_spec.md");
  const existingSpec = await readTextIfExists(skillSpecPath);
  if (existingSpec?.content !== META_SPEC) {
    await fs.writeFile(skillSpecPath, META_SPEC, "utf8");
  }
}

console.log("Generated _meta domain maps.");
