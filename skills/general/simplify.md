---
name: skills/general/simplify
description: >
  Simplification guidance for readability-only refactors, behavior-preserving
  cleanup, reducing duplication, and avoiding drive-by design changes.
type: sub-skill
category: general
---

# Simplify

## Setup
Use this when asked to improve readability or reduce complexity without changing behavior.

## Core Patterns

### Preserve behavior
Identify the observable behavior and keep it identical. Favor refactors that are easy to reason about.

### Reduce nesting
Use early returns or small helpers to flatten control flow and make intent clearer.

### Remove dead code
Delete unused branches, variables, or helpers once you confirm they are truly unused.

## Common Mistakes

### Removing guards
Wrong
```js
function formatName(user) {
  return user.name.trim();
}
```
Correct
```js
function formatName(user) {
  if (!user) return "Unknown";
  return user.name.trim();
}
```
Explanation: Dropping a null guard changes runtime behavior and can introduce crashes.

### Broad style churn
Wrong
```text
"I reformatted the whole file while refactoring a single function."
```
Correct
```text
"I limited changes to the targeted function and its immediate helpers."
```
Explanation: Large formatting diffs make reviews harder and hide unintended changes.
