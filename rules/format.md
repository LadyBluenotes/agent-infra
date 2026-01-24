# Rules: Module Format

## Apply When
- Creating or editing modules in this repo.

## Do
- Keep modules short and non-overlapping.
- Use this standard Markdown shape:
  - `# <Name>`
  - `## Apply When`
  - `## Do`
  - `## Don't`
  - `## Output` (optional; include when it changes expectations)
- Use `@path/to/module.md` when pointing to other modules.
- Prefer checklists/templates over prose.

## Don't
- Don't duplicate guidance across layers (`rules/` vs `contexts/` vs playbooks vs `agents/`).
- Don't use YAML front matter in instruction files (keeps tokens low; avoids format drift) unless instructed to.
