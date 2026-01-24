---
name: Overview
description: Router for TypeScript skill modules.
resources:
  - https://www.typescriptlang.org/docs/handbook/intro.html
---

# Overview

## Apply When
- Working in .ts, .tsx, or .d.ts files.
- Configuring tsconfig or TypeScript build tooling.

## Do
- Pick the smallest module that matches the task:
  - Types and modeling: @skills/code/typescript/types.md
  - Config and compiler flags: @skills/code/typescript/config.md
  - Error diagnostics: @skills/code/typescript/errors.md
  - Modules and exports: @skills/code/typescript/modules.md
  - Performance and build time: @skills/code/typescript/performance.md
  - Runtime boundaries: @skills/code/typescript/runtime.md
  - API modeling: @skills/code/typescript/api-modeling.md
  - JS interop and .d.ts: @skills/code/typescript/interop.md
  - Testing patterns: @skills/code/typescript/testing.md
  - Deep references: @skills/code/typescript/curated.md

## Playbooks
- Types: @skills/code/typescript/types.md (unions, generics, invariants)
- Config: @skills/code/typescript/config.md (tsconfig flags and compiler setup)
- Errors: @skills/code/typescript/errors.md (diagnostics, narrowing, fixes)
- Modules: @skills/code/typescript/modules.md (type-only imports, public API surfaces)
- Performance: @skills/code/typescript/performance.md (compile/typecheck tuning)
- Runtime boundaries: @skills/code/typescript/runtime.md (validate unknown inputs)
- API modeling: @skills/code/typescript/api-modeling.md (stable DTOs, discriminated unions)
- Interop: @skills/code/typescript/interop.md (JS integration, declaration files)
- Testing: @skills/code/typescript/testing.md (type-level checks, runtime tests)
- Curated: @skills/code/typescript/curated.md (deep reference material)

## Don't
- Don't apply TypeScript-specific rules to JS-only tasks.

## Output
- Call out TypeScript-specific tradeoffs and boundary decisions.
