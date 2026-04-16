---
name: skills/general/validate
description: >
  Validation guidance for choosing and running tests, builds, typechecks, lint,
  smoke checks, and reporting exact verification commands.
type: sub-skill
category: general
---

# Validate

## Setup
Use this after code changes or performance work.

## Core Patterns

### Run the narrowest check
Pick the smallest relevant command (test, typecheck, lint, build) to validate the change.

### Report what ran
State the command and outcome. If you did not run checks, say so and provide the command.

### Surface failures
If a check fails, include the error summary and the file or location involved.

## Common Mistakes

### Claiming unrun checks
Wrong
```text
"All tests pass."
```
Correct
```text
"I did not run tests. You can verify with: npm test."
```
Explanation: Verification claims must match what was actually run.

### Running overly broad commands
Wrong
```text
"I ran the entire test suite when only one package changed."
```
Correct
```text
"I ran the package-level test that covers the change."
```
Explanation: Narrow checks provide fast, focused feedback.
