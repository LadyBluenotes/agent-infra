---
name: skills/preferences/conventions
description: >
  Personal conventions entry point for coding style, tooling choices, tests,
  project structure, docs, git, verification, and when to load deeper prefs.
type: skill
category: preferences
depth: primary
aliases:
  - preferences
  - conventions
tags:
  - preferences
  - conventions
  - personal workflow
references:
  - skills/preferences/tooling
  - skills/preferences/testing
  - skills/preferences/project-structure
  - skills/preferences/git
  - skills/preferences/docs
sources:
  - AGENTS.md
  - https://github.com/antfu/skills/tree/main/skills/antfu
---

# Personal Conventions

## Setup

Use this when the prompt asks how Sarah wants a project shaped, not how a tool works in general.

## Core Patterns

### Separate facts from preferences

```text
Tool fact: pnpm workspaces need pnpm-workspace.yaml.
Preference: use pnpm-only once the repo policy is decided.
```

Tooling skills describe external behavior. Preference skills describe project choices.

### Keep preferences scoped

```text
Load `skills/preferences/testing` for test style.
Load `skills/tooling/vitest/config` for Vitest config mechanics.
```

Do not load a broad conventions page when a narrow preference page answers the prompt.

### Preserve safety gates

```text
Read before editing.
Run git status before edits.
Verify before completion claims.
Do not commit unless asked.
```

Project preferences never override safety, source-truth, or git hard gates.

## Common Mistakes

### HIGH Treating preference as external truth

```text
Wrong: "All pnpm repos should never have package-lock.json."
Correct: "Sarah's preference is pnpm-only for repos that have selected pnpm."
```

Preferences should be labeled as preferences unless backed by a source or command.
