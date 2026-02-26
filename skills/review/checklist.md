---
name: skills/review/checklist
description: Code review checklist for correctness, security, and quality.
type: sub-skill
category: review
---

# Checklist

## Setup
Use this when reviewing code, diffs, or changesets.

## Core Patterns

### Correctness
Behavior matches intent and edge cases are handled.

### Errors
Failures are explicit and exceptions are not swallowed.

### Security
Input validation, authorization boundaries, and secrets handling are sound.

### Tests
New behavior is covered by tests or checks.

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
