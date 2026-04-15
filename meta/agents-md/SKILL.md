---
name: agents-md
description: >
  Write and maintain AGENTS.md with a minimal, reference-first style.
  Use when creating or updating agent instruction files.
metadata:
  version: "1.0"
  category: meta-tooling
  output_artifacts:
    - AGENTS.md
---

# AGENTS.md

Use this when creating or updating `AGENTS.md`, `CLAUDE.md`, or similar agent instruction files.

## Setup

- Locate the repo root and any existing agent instruction files.
- Enumerate local skills and indexes before writing.

```bash
ladybluenotes skills list
```

## Core Patterns

### Keep it minimal
Use short headers and bullets. Avoid paragraphs.

### Reference skills, do not duplicate
Point to existing skills instead of restating guidance.

```markdown
## Database
Use @skills/db/migrations.md
```

### Include only essential project rules
Capture constraints an agent must not miss (tooling, conventions, critical commands).

### Prefer one canonical file
If multiple filenames are required, create a symlink instead of duplicating content.

## Common Mistakes

### Long prose blocks
Wrong
```markdown
AGENTS.md explains how to work in this repo and provides a detailed overview...
```
Correct
```markdown
## Repo Rules
- Use pnpm for installs and scripts.
- Keep changes minimal and localized.
```
Explanation: Agents scan quickly; long prose hides key constraints.

### Duplicating skill content
Wrong
```markdown
## Testing
Run unit tests, integration tests, and e2e tests...
```
Correct
```markdown
## Testing
Use @skills/testing/strategy.md
```
Explanation: Skills are the source of truth; AGENTS.md should reference them.

### Overloading with generic guidance
Wrong
```markdown
## Code Style
Write clean code and add tests.
```
Correct
```markdown
## Code Style
Use @skills/general/implement.md
```
Explanation: Keep AGENTS.md focused on repo-specific rules and references.
