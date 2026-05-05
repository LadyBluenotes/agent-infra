---
name: skills/debug/workflow
description: >
  Feedback-loop-first debugging workflow for errors, test failures, flaky
  behavior, performance regressions, repros, hypotheses, instrumentation, root
  fixes, regression checks, and cleanup.
type: sub-skill
category: debug
aliases:
  - diagnose
  - debugging workflow
tags:
  - debug
  - diagnosis
  - feedback loop
---

# Debugging Workflow

## Setup

Use this workflow when you have a concrete failure, failing test, incorrect
output, flaky behavior, or performance regression.

## Core Patterns

### Build the feedback loop first

```text
Bug report -> focused pass/fail command -> original scenario verification.
```

Spend most of the effort on a fast, deterministic loop. Use a failing test,
CLI fixture, curl script, browser script, replayed trace, or small harness that
shows the user's failure mode.

### Reproduce and narrow

```text
Exact symptom:
Smallest trigger:
Original trigger:
```

Confirm the loop fails for the same reason the user reported. Reduce variables
until the failure is isolated enough to debug.

### Rank falsifiable hypotheses

```text
1. If X causes the failure, changing Y should make Z happen.
2. If A causes the failure, instrumenting B should show C.
```

List 3-5 hypotheses before probing when the cause is not obvious. Each one
needs a prediction that can be disproven.

### Instrument one prediction

```text
[DEBUG-a4f2] relevant boundary value
```

Probe only the boundary that distinguishes hypotheses. Prefer debugger or REPL
inspection where available. If temporary logs are needed, tag them so cleanup is
mechanical.

### Fix at the root

```text
Failing loop -> root-cause patch -> same loop passes -> original scenario passes.
```

Implement the smallest change that addresses the cause, not the symptom.

### Verify and clean up

```text
Focused loop passes.
Original scenario passes.
Regression test added where the repo owns the behavior.
Temporary debug output removed.
```

If no correct regression seam exists, say that. Do not add shallow tests that
exercise a different failure pattern.

## Common Mistakes

### HIGH Changing code without a loop

Wrong
```text
"I inspected the code and patched the likely cause."
```
Correct
```text
"I reproduced the reported failure with this focused command, then patched it."
```
Explanation: Without a pass/fail loop, changes are guesses and can mask the real bug.

### HIGH Testing multiple hypotheses at once

Wrong
```text
"I changed three things and it went away."
```
Correct
```text
"I changed one thing, verified the effect, then moved to the next."
```
Explanation: Single-variable experiments make causality clear and prevent regressions.

### HIGH Fixing the symptom only

Wrong
```text
"I wrapped it in a try/catch so it doesn't crash."
```
Correct
```text
"I fixed the null value at its source and added a guard test."
```
Explanation: Symptom-only fixes hide the underlying defect and make debugging harder later.

### MEDIUM Leaving debug output behind

Wrong
```text
"I added broad console logging and left it because it might help later."
```
Correct
```text
"I tagged temporary logs, verified the fix, then removed them."
```
Explanation: Debug instrumentation should not become production noise.
