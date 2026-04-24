---
name: skills/general/implement
description: >
  Implementation guidance for scoped code changes, explicit assumptions,
  minimal reversible patches, request-traceable diffs, convention matching,
  and focused validation.
type: sub-skill
category: general
---

# Implement

## Setup
Use this when making code changes for features, fixes, or refactors.

## Core Patterns

### Confirm before changing
Propose the exact change and wait for user confirmation before editing code, docs, skills, notes, config, generated files, process files, staging files, updating logs, or running formatters that rewrite files.

### Frame non-trivial work
State assumptions, viable interpretations, tradeoffs, and success criteria before implementation. Ask when ambiguity changes scope, security, privacy, data shape, UX, or verification.

### Read before editing
Confirm entry points, constraints, and existing conventions before changing code.

### Smallest correct solution
Keep the change set small and local. Do not add features, options, caching, validation layers, strategy objects, configuration, or future-proofing unless requested or proven necessary.

### Request-traceable diff
Every changed line should trace to the user's request. Avoid adjacent style cleanup, comment rewrites, docstrings, type hints, formatting churn, or broader validation unless needed for the task.

### Clean up only your change
Remove imports, variables, functions, files, or tests made unused by your change. Leave pre-existing dead code alone unless asked.

### Follow conventions
Match existing structure, naming, and tooling rather than introducing new patterns.

### Validate with success criteria
Turn the request into a verifiable goal. For bug fixes, first create or run a focused test/check that fails the same way the reported bug fails, then patch at that failing surface and make the same check pass. If this cannot be done, say why before fixing.

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

### Premature flexibility
Wrong
```text
"I added a strategy pattern, optional cache, and notification hook for a single save path."
```
Correct
```text
"I implemented the requested save path only; add caching or hooks when a concrete requirement appears."
```
Explanation: Flexibility added before a requirement makes code harder to read, test, and review.

### Style drift during a narrow fix
Wrong
```text
"I fixed the empty-email bug and also added type hints, rewrote comments, and normalized quotes."
```
Correct
```text
"I changed only the email handling needed for the empty-email bug."
```
Explanation: Unrelated style edits hide the behavioral change and increase regression risk.

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
