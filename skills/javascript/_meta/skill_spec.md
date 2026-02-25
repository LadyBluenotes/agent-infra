---
library: javascript
library_version: "ES2023"
status: draft
sources:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors
  - https://javascript.info/
  - https://javascript.info/async
  - https://javascript.info/promise-basics
  - https://javascript.info/modules
  - https://javascript.info/error-handling
  - https://javascript.info/array-methods
  - https://javascript.info/object
---

# JavaScript Skill Spec

## Skill Inventory

| Skill | Type | Purpose | Primary Sources |
| --- | --- | --- | --- |
| skills/javascript/index.md | core | Entry point for JS tasks and routing. | MDN JS Guide, javascript.info |
| skills/javascript/async.md | sub-skill | Promises, async/await, concurrency. | MDN Promise, javascript.info async |
| skills/javascript/errors.md | sub-skill | Error types and handling patterns. | MDN Errors, javascript.info error-handling |
| skills/javascript/modules.md | sub-skill | ESM syntax and module loading. | MDN import, javascript.info modules |
| skills/javascript/runtime.md | sub-skill | Runtime validation and type checks. | MDN JS Guide |
| skills/javascript/data.md | sub-skill | Arrays, objects, collections. | javascript.info array-methods, object |
| skills/javascript/browser.md | sub-skill | Browser APIs and DOM safety. | MDN JS Guide |
| skills/javascript/node.md | sub-skill | Node runtime APIs and patterns. | MDN JS Guide |
| skills/javascript/nodejs.md | sub-skill | Node project config and module type. | MDN JS Guide |
| skills/javascript/security.md | sub-skill | Injection prevention and unsafe APIs. | MDN JS Guide |
| skills/javascript/testing.md | sub-skill | Test structure and error paths. | MDN JS Guide |
| skills/javascript/javascript-patterns.md | sub-skill | Composition patterns. | MDN JS Guide |

## Failure Mode Themes

- Unhandled promise rejections due to missing await/catch.
- `Promise.all` aborting entire sets when partial results are desired.
- ESM/CJS mismatches causing runtime import failures.
- Truthiness checks losing valid values (0, "").
- Unsafe DOM writes via `innerHTML`.
- Array sorting without comparators causing lexical order.

## Cross-Skill Tensions

- Concurrency vs error isolation (all vs allSettled).
- Runtime validation vs developer speed (boundary checks).
- ESM purity vs compatibility with CommonJS dependencies.
