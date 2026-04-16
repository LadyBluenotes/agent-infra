---
name: skills/docs/ref/context-preservation
description: >
  Deep reference for preserving useful source-backed context during docs
  rewrites, migrations, hallucination audits, and duplication passes.
type: reference
category: docs
depth: reference
tags:
  - docs
  - context preservation
  - migration
sources:
  - https://diataxis.fr/reference/
---

# Context Preservation Reference

## Setup

Use this when removing, moving, or rewriting existing docs prose.

## Core Patterns

### Classify removed prose

```text
Removed text categories:
- unsupported claim: remove
- duplicate wording: remove or merge
- source-backed behavior: keep or move
- style mismatch: rewrite
```

Do not treat all removed text as cleanup.

### Preserve observable behavior

```text
Keep:
- when an API runs
- what it returns
- how options affect behavior
- constraints and failure modes
- source-backed examples
```

Behavior details are high-value reference material.

### Run a removed-lines pass

```sh
git diff --word-diff -- docs/reference.md
```

Use the diff to catch accidental deletion of facts.

## Common Mistakes

### HIGH Removing context because it is not in the new outline

```text
Wrong: delete a cache invalidation rule during a section reorder.
Correct: move it into Behavior or Options.
```

Reference docs need the fact even if the section label changes.
