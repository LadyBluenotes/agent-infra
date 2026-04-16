---
name: skills/tooling/pnpm/ref/patches
description: >
  pnpm patch workflow reference for patching dependencies with pnpm patch,
  pnpm patch-commit, and reviewable patch files.
type: reference
category: tooling
library: pnpm
depth: reference
tags:
  - pnpm
  - patch
  - dependency patch
sources:
  - https://pnpm.io/cli/patch
---

# pnpm Patches Reference

## Setup

```sh
pnpm patch some-package@1.0.0
# edit the generated package copy
pnpm patch-commit <edit-dir>
```

## Core Patterns

### Patch only when replacement or upstream fix is not practical

```text
Use a patch for a narrow dependency defect that must be fixed locally.
```

Prefer normal upgrades, overrides, or upstream fixes when they solve the problem.

### Keep patch files reviewable

```text
patches/
  some-package@1.0.0.patch
```

Patch files should be small enough to audit and should not include unrelated generated output.

## Common Mistakes

### HIGH Patching without recording why

```text
Wrong: add a patch file with no source bug or local rationale.
Correct: note the upstream issue, local symptom, and removal condition.
```

Patch files are easy to forget; give future maintainers the exit condition.
