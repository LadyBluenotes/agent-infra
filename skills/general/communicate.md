---
name: skills/general/communicate
description: >
  Communication guidance for concise task updates, final summaries, touched
  paths, verification evidence, unchecked work, blockers, and residual risk.
type: sub-skill
category: general
---

# Communicate

## Setup
Use this when reporting completed work back to the requester.

## Core Patterns

### Intent then changes
Explain the why first, then list the key changes concisely.

### Reference paths
Point to the exact files touched so changes are easy to locate.

### Verification steps
List the commands you ran and their results, or say what should be run.

### Performance results
For performance work, include before/after measurements and method.

## Common Mistakes

### Listing changes without intent
Wrong
```text
"Updated three files and refactored a helper."
```
Correct
```text
"Fixed the login crash by guarding null sessions, then updated tests to cover it."
```
Explanation: Intent clarifies why the changes matter and speeds up review.

### Claiming verification you did not run
Wrong
```text
"All tests pass."
```
Correct
```text
"I did not run tests. You can verify with: npm test."
```
Explanation: Overstating verification is misleading and can hide risk.
