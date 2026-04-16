---
name: skills/typescript/ref/curated
description: Curated references, release notes, and deep behavior changes.
type: reference
category: typescript
library: typescript
library_version: "5.9"
sources:
  - https://www.typescriptlang.org/docs/handbook/intro.html
  - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html
---

# Curated References

## Primary References

- Handbook intro: https://www.typescriptlang.org/docs/handbook/intro.html
- TSConfig reference: https://www.typescriptlang.org/tsconfig
- Utility types: https://www.typescriptlang.org/docs/handbook/utility-types.html
- Types from types: https://www.typescriptlang.org/docs/handbook/2/types-from-types.html
- Modules: https://www.typescriptlang.org/docs/handbook/2/modules.html
- Project references: https://www.typescriptlang.org/docs/handbook/project-references.html

## Behavioral Changes (5.5)

- Inferred type predicates for filter-like functions narrow arrays more aggressively.
- Constant indexed access narrowing improves control flow precision.
- Regex literal syntax checking can surface new errors.
- `--isolatedDeclarations` flag introduces stricter export typing requirements.
- Deprecated compiler options in 5.0 no longer apply.
- Decorator parsing is stricter; `@super.decorate` needs parentheses.
- `undefined` can no longer be used as a definable type name.

## References

- @skills/typescript/ref/typescript-types.md
