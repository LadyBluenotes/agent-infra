---
name: skills/general/validate
description: >
  Validation guidance for defining success criteria, choosing and running
  tests, builds, typechecks, lint, smoke checks, and reporting exact
  verification commands.
type: sub-skill
category: general
---

# Validate

## Setup
Use this after code changes or performance work.

## Core Patterns

### Define success criteria
Before changing behavior, convert the request into a checkable goal: expected input, expected output, and command or manual check that proves it.

### Reproduce bugs first
For bug fixes, write or run the smallest focused test/check that fails the same way the reported bug fails. Then use that same check to prove the fix. If reproduction is not possible, state why before fixing.

### Run the narrowest check
Pick the smallest relevant command (test, typecheck, lint, build) to validate the change.

### Match the claim
Use the check that proves the specific claim. A lint pass does not prove runtime behavior; a unit test does not prove a production build.

### Clarify vague performance targets
For "make it faster" requests, identify the target before measuring: latency, throughput, perceived speed, memory, CPU, bundle size, or startup time.

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

### Vague success criteria
Wrong
```text
"I improved authentication and tested it."
```
Correct
```text
"I verified password changes invalidate old sessions with the focused auth test."
```
Explanation: A clear claim needs the behavior and the proving check.

### Fixing without reproducing
Wrong
```text
"I inspected the code, found the likely issue, patched it, and ran the suite."
```
Correct
```text
"I added a focused test that fails with the reported duplicate-score ordering bug, patched the sorter, then reran that test and it passed."
```
Explanation: Bug fixes need a failing-before, passing-after check tied to the observed symptom whenever possible.

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
