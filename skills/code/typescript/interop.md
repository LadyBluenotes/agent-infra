---
name: Interop
description: JS interop, .d.ts files, and ambient types.
resources:
  - https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html
---

# Interop

## Apply When
- Consuming JS modules or authoring declaration files.

## Do
- Create minimal .d.ts definitions for JS modules you own.
- Use module augmentation sparingly.

## Don't
- Don't use global augmentations without a clear boundary.

## Examples

```ts
declare module "legacy-lib" {
  export function run(input: string): string;
}
```
