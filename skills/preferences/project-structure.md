---
name: skills/preferences/project-structure
description: >
  Personal project-structure preferences for small reviewable modules,
  grouped skill directories, ref pages, and avoiding junk-drawer categories.
type: skill
category: preferences
depth: primary
tags:
  - preferences
  - project structure
  - skills
references:
  - skills/tooling/cli/skill-discovery
sources:
  - AGENTS.md
---

# Project Structure Preferences

## Setup

Use this when arranging files, categories, and skill trees.

## Core Patterns

### Group by task domain

```text
skills/tooling/vitest/config.md
skills/tooling/vitest/ref/mocking.md
```

Directory grouping should help discovery without needing an index page.

### Put deep detail under `ref/`

```text
Primary page: common tasks.
Ref page: long option sets, edge cases, and source-backed detail.
```

Refs should be available but not loaded by default.

### Avoid personal junk drawers

```text
Use `preferences/` for project choices.
Use `tooling/` for external tool behavior.
```

Category names should describe content, not just ownership.

## Common Mistakes

### MEDIUM Creating router pages for CLI-owned discovery

```text
Wrong: `SKILL.md` exists only to point elsewhere.
Correct: add enough metadata for the CLI to choose the specific page.
```

The CLI should handle routing when pages have clear names, aliases, tags, and descriptions.
