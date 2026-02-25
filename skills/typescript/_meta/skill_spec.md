---
library: typescript
library_version: "5.9"
status: draft
sources:
  - https://www.typescriptlang.org/docs/handbook/intro.html
  - https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
  - https://www.typescriptlang.org/docs/handbook/2/narrowing.html
  - https://www.typescriptlang.org/docs/handbook/2/generics.html
  - https://www.typescriptlang.org/docs/handbook/2/modules.html
  - https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
  - https://www.typescriptlang.org/docs/handbook/project-references.html
  - https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html
  - https://www.typescriptlang.org/docs/handbook/utility-types.html
---

# TypeScript Skill Spec

This spec follows the domain-discovery and tree-generator playbooks. It is designed for progressive disclosure: a core router skill plus sub-skills and references.

## Skill Inventory

| Skill | Type | Purpose | Primary Sources |
| --- | --- | --- | --- |
| skills/typescript/index.md | core | Entry point for TypeScript tasks and routing. | Handbook intro |
| skills/typescript/types.md | sub-skill | Everyday types, unions, narrowing, generics basics. | Everyday Types, Narrowing, Generics |
| skills/typescript/config.md | sub-skill | tsconfig and project layout. | TSConfig Reference, Project References |
| skills/typescript/errors.md | sub-skill | Diagnostic workflows and common error fixes. | Everyday Types, Narrowing |
| skills/typescript/modules.md | sub-skill | ES modules, type-only imports, module resolution. | Modules, Module Resolution |
| skills/typescript/runtime.md | sub-skill | Runtime boundaries and unknown input validation. | Narrowing |
| skills/typescript/api-modeling.md | sub-skill | Discriminated unions and stable DTOs. | Narrowing, Everyday Types |
| skills/typescript/interop.md | sub-skill | JS interop and declaration files. | Declaration Files, JS Type Checking |
| skills/typescript/testing.md | sub-skill | Type-level test patterns and compile checks. | Handbook + tsc build mode |
| skills/typescript/performance.md | sub-skill | Build performance, project references, incremental. | Project References, TSConfig |
| skills/typescript/typescript-types.md | reference | Utility types and advanced type operators. | Utility Types, Types from Types |
| skills/typescript/curated.md | reference | Deep references and release notes. | TS handbook, release notes |

## Failure Mode Themes (to include in sub-skills)

- Unsound assertions (`as`, non-null `!`) hide runtime failures.
- Falsy checks that narrow away valid values (`0`, `""`).
- `typeof x === "object"` includes `null`.
- Module resolution mismatches (ESM/CJS) break runtime imports.
- `any` and implicit `any` leak through and erase safety.
- tsconfig with inputs bypassed (tsc with explicit files ignores config).
- Declaration emit failing without explicit exports/annotations (`isolatedDeclarations`).

## Cross-Skill Tensions

- Config strictness vs developer velocity: tighten gradually.
- Runtime validation vs static narrowing: always validate unknown boundaries.
- Module interop settings vs runtime environment expectations.

## References (deep detail)

- Utility types and type operators should live in reference skills.
- Release-note behavior changes should be captured in curated references.
