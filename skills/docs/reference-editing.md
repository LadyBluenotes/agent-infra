---
name: skills/docs/reference-editing
description: >
  Source-backed reference editing workflow for API docs, template migrations,
  context preservation, option behavior, and removed-prose checks.
type: skill
category: docs
depth: primary
aliases:
  - reference-editing
tags:
  - docs
  - reference
  - source-backed
  - context preservation
references:
  - skills/docs/ref/context-preservation
  - skills/docs/reference
  - skills/general/source-of-truth
sources:
  - https://diataxis.fr/reference/
---

# Reference Editing

## Setup

Use this when editing API reference pages, especially during template migrations or hallucination audits.

## Core Patterns

### Inventory source-backed claims before editing

```text
For each paragraph:
- What API behavior is claimed?
- What source backs it?
- Should the claim stay, move, or be removed?
```

Reference edits should preserve accurate behavioral context even when the page shape changes.

### Keep Diataxis reference intent

```text
Reference page:
- names the API
- states what it does
- lists parameters and options
- gives behavior and constraints
- uses examples to clarify exact usage
```

Do not turn reference pages into tutorials or explanations unless requested.

### Check removed text before completion

```sh
git diff -- path/to/reference.md
```

Review removed prose for source-backed details that should be retained or relocated.

## Common Mistakes

### HIGH Template migration drops useful behavior

```text
Wrong: remove old behavior notes because they do not fit the new template.
Correct: preserve source-backed behavior under the closest reference section.
```

Template consistency is secondary to accurate API behavior.

### HIGH Adding unsupported option effects

```text
Wrong: infer that `options.onComplete` runs after every navigation.
Correct: read implementation or official docs before stating callback behavior.
```

Option behavior needs source truth.
