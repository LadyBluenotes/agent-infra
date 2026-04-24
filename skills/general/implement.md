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

### Confirm before changing
Propose the exact change and wait for user confirmation before editing code, docs, skills, notes, config, generated files, process files, staging files, updating logs, or running formatters that rewrite files.

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

### Editing without confirmation
Wrong
```text
"I applied the wording change because it was small."
```
Correct
```text
"I proposed the exact wording and waited for approval before applying it."
```
Explanation: User-authored work stays under user control; approval comes before changes, not after.

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
