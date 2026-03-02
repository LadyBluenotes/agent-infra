---
name: write-a-skill
description: >
  Authoring guide for skill files and meta skills in agent-infra.
  Use when creating or updating skills, reorganizing skill trees,
  or onboarding contributors to the new agent-friendly format.
metadata:
  version: "2.0"
  category: meta-tooling
  output_artifacts:
    - skill_file.md
    - skill_index.md
  skills:
    - domain-discovery
    - tree-generator
---

# Writing Skills for agent-infra

This repo is skills-only. Skills are the single source of guidance.
They must be short, concrete, and optimized for agent use.

## Module Types

| Type | Directory | Purpose |
| --- | --- | --- |
| Skill | skills/ | Task playbooks and reference knowledge |
| Agent | agents/ | Heuristics for what “good” looks like (optional) |
| Meta | meta/ | Tooling for generating and maintaining skills |

Avoid duplicating guidance across files. Each skill owns one concern.

---

## Internal Skills (skills/)

Internal skills follow the agent-friendly format (durable-streams style).

### Frontmatter

```yaml
---
name: skills/[category]/[skill-name]
description: >
  Dense, 1–2 sentence routing key. What this skill covers.
type: [core | sub-skill | reference]
  category: [general | typescript | javascript | docs | debug | review | performance | seo | research | libraries]
library: [optional]
library_version: [optional]
sources:
  - [optional URL]
---
```

### Body Structure

```markdown
# [Skill Name]

## Setup
[Minimum working example. Real imports. No placeholders.]

## Core Patterns
[2–4 patterns by default. Add as many as needed to make the guidance unambiguous. Each pattern has a code block and 1–2 lines of explanation.]

## Common Mistakes

### [PRIORITY] [Short problem name]

```ts
// Wrong
```

```ts
// Correct
```

[1 sentence: what fails and why. Add more examples if a single wrong/correct pair is not enough.]

## Tensions (optional)

- [Tradeoff statement]

## References (optional)

- @skills/[category]/[reference-skill].md

Include this section whenever you add any references/ files.
```

### Core Index Skills (index.md)

Use a short index instead of Apply/Do/Don’t.

```markdown
---
name: skills/[category]/index
description: Entry point and index for [category] skills.
type: core
category: [category]
---

# [Category]

| Area | Skill |
| --- | --- |
| [Topic] | @skills/[category]/[skill].md |

## References
- @skills/[category]/[reference].md
```

---

## Library Skills (generated)

Library-specific skills should follow the tree-generator format:

```yaml
---
name: [lib]/[domain]
description: >
  Dense routing key for this domain.
type: [core | sub-skill | framework | lifecycle | composition | security]
library: [lib]
library_version: "[version]"
sources:
  - [repo:path]
requires:            # only for framework/composition skills
  - [lib]-core
---
```

```markdown
# [Library] — [Domain]

## Setup
[Complete, copy-pasteable example]

## Core Patterns
[2–4 patterns with code]

## Common Mistakes
[3+ mistakes with wrong/correct and short explanation]

## References (optional)
- references/[topic].md

Include this section whenever you add any references/ files.
```

Use meta/domain-discovery and meta/tree-generator to build these.

---

## Agents (optional)

Agents capture heuristics, not workflows. Keep them short and concrete.

```yaml
---
name: agents/[domain]
description: >
  Heuristics for what good looks like in [domain].
type: agent
category: [language | framework | task]
---
```

```markdown
# [Domain]

## Heuristics
- [What to optimize for]
- [Common pitfalls]
- [Preferred patterns]
```

---

## Registration

1) Add skill paths to `registry.yaml` under the correct category.
2) Ensure the skill is discoverable via `ladybluenotes playbook list`.
3) Update the parent index.md (if adding a new skill).

---

## Validation Checklist

| Check | Rule |
| --- | --- |
| Frontmatter present | name, description, type, category present |
| Name matches path | name matches file path without .md |
| Code blocks complete | Real imports, copy-pasteable |
| No Apply/Do/Don’t | Use Setup/Core Patterns/Common Mistakes |
| One concern per skill | Split to sub-skills if too broad |
| References lean | Use references for deep detail; include References section when references/ exists |
| Registered | registry.yaml updated |
