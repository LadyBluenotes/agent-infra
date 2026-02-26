---
name: skills/debug/workflow
description: A practical debugging workflow for errors, test failures, and unexpected behavior.
type: sub-skill
category: debug
---

# Debugging Workflow

## Setup
Use this workflow when you have a concrete failure (error, failing test, incorrect output). Start by capturing the exact failure and a minimal, repeatable way to trigger it.

## Core Patterns

### Capture and narrow
Start with the exact error message and reproduce it with the smallest input. Reduce variables until the failure is consistent and isolated.

### Hypothesis, then smallest test
Form one hypothesis and validate it with the smallest possible experiment (log, breakpoint, targeted test, or single input case). Avoid multiple changes at once.

### Fix at the root
Implement the smallest change that addresses the root cause, not just the symptom. Confirm the fix on the minimal repro first, then on the original scenario.

### Verify and guard
Re-run the most relevant test or command. If the failure could regress, add a small test or check near the root cause.

## Common Mistakes

### Changing code without a repro
Wrong
```text
"It only happens sometimes, so I just added a try/catch."
```
Correct
```text
"I reproduced the error with input X and isolated it to function Y."
```
Explanation: Without a repro, changes are guesswork and often mask the real bug.

### Testing multiple hypotheses at once
Wrong
```text
"I changed three things and it went away."
```
Correct
```text
"I changed one thing, verified the effect, then moved to the next."
```
Explanation: Single-variable experiments make causality clear and prevent regressions.

### Fixing the symptom only
Wrong
```text
"I wrapped it in a try/catch so it doesn't crash."
```
Correct
```text
"I fixed the null value at its source and added a guard test."
```
Explanation: Symptom-only fixes hide the underlying defect and make debugging harder later.
