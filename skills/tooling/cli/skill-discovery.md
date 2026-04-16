---
name: skills/tooling/cli/skill-discovery
description: >
  CLI skill discovery and resolver guidance for grouped markdown skills, aliases,
  refs, compact mappings, local/global scan scope, and install generation.
type: skill
category: tooling
depth: primary
aliases:
  - skill discovery
  - skill resolver
tags:
  - cli
  - skills
  - resolver
  - discovery
references:
  - skills/preferences/project-structure
sources:
  - src/helpers.mjs
  - src/commands/list.mjs
  - src/commands/show.mjs
---

# CLI Skill Discovery

## Setup

Use this when changing how `ladybluenotes` discovers, lists, searches, shows, installs, or maps skills.

## Core Patterns

### Let metadata replace router pages

```yaml
aliases:
  - vitest
tags:
  - vitest
  - config
depth: primary
```

Use names, descriptions, aliases, tags, and depth to make pages discoverable without `SKILL.md` index files.

### Hide refs from default lists

```text
Default list: primary skills.
Explicit list/search: reference pages included when requested or specifically matched.
```

Refs are for deeper loading, not default orientation.

### Preserve exact path lookup

```sh
ladybluenotes skills show skills/tooling/vitest/ref/mocking
```

Search can be fuzzy, but exact names and paths must remain stable.

### Keep scan scope explicit

```text
Local repo first.
Installed package second.
Global skills root last.
```

Local project guidance should override broader global guidance unless the command asks otherwise.

## Common Mistakes

### HIGH Requiring a router file for every directory

```text
Wrong: create `SKILL.md` only to point at `config.md`.
Correct: let `search` and aliases resolve to `config.md`.
```

The CLI owns discovery; files should own task guidance.

### HIGH Hiding references from exact access

```text
Wrong: refs are invisible to `show`.
Correct: refs are hidden from default list but showable by exact path.
```

Hidden from default output is not the same as undiscoverable.
