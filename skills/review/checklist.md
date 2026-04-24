---
name: skills/review/checklist
description: >
  Code-review checklist for finding correctness bugs, regressions, security
  risks, missing tests, edge cases, scope creep, premature abstractions, and
  maintainability issues.
type: sub-skill
category: review
---

# Checklist

## Setup
Use this when reviewing code, diffs, or changesets.

## Core Patterns

### Correctness
Behavior matches intent and edge cases are handled.

### Scope
Every changed line traces to the request. No drive-by formatting, comment rewrites, type additions, adjacent validation, or unrelated cleanup.

### Simplicity
The solution is the smallest correct shape. No single-use abstractions, speculative options, unused extension points, or future features.

### Errors
Failures are explicit and exceptions are not swallowed.

### Security
Input validation, authorization boundaries, and secrets handling are sound.

### Tests
New behavior is covered by tests or checks.

### Verification
The author defined success criteria and ran the check that proves the claim. Bug fixes show a focused failing-before, passing-after test/check tied to the observed symptom, or explain why reproduction was not possible.

### Readability
Names and structure are clear, with comments only where needed.

### Performance
Avoid obvious hot-path regressions or expensive patterns.

## Common Mistakes

### Nitpicking tool-enforced style
Wrong
```text
"Please reformat this line" (formatter already enforced).
```
Correct
```text
"No style feedback; formatter will handle it."
```
Explanation: Focus reviews on correctness and maintainability, not formatting.

### Skipping missing tests
Wrong
```text
"Looks good" (no tests for new behavior).
```
Correct
```text
"Please add a test for the new branch in X." 
```
Explanation: Tests are the primary guard against regressions.

### Approving scope creep
Wrong
```text
"Looks good" (the bug fix also rewrites nearby validation and formatting).
```
Correct
```text
"Please keep the diff to the empty-input bug; the validation rewrite needs a separate request."
```
Explanation: Review should protect narrow intent and keep unrelated risk out of the change.
