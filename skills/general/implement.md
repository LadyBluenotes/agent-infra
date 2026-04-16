---
name: skills/general/implement
description: >
  Implementation guidance for scoped code changes, read-before-edit workflow,
  minimal reversible patches, convention matching, and focused validation.
type: sub-skill
category: general
---

# Implement

## Setup
Use this when making code changes for features, fixes, or refactors.

## Core Patterns

### Read before editing
Confirm entry points, constraints, and existing conventions before changing code.

### Minimal, reversible change
Keep the change set small and local. Make it easy to roll back if needed.

### Follow conventions
Match existing structure, naming, and tooling rather than introducing new patterns.

### Validate with tests
Add or update tests when behavior changes and run the most relevant checks.

## Common Mistakes

### Changing code without a plan
Wrong
```text
"I started editing before identifying the entry point."
```
Correct
```text
"I confirmed the entry point and constraints, then made a small, targeted change."
```
Explanation: A short plan reduces churn and prevents wrong-scope changes.

### Large sweeping edits
Wrong
```text
"I refactored the whole module while fixing a single bug."
```
Correct
```text
"I limited changes to the function involved in the bug."
```
Explanation: Large edits increase risk and make review harder.

### Inventing new conventions
Wrong
```text
"I introduced a new helper pattern that isn't used elsewhere."
```
Correct
```text
"I matched the existing helper pattern already used in this module."
```
Explanation: Consistency keeps the codebase predictable and maintainable.
