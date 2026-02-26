---
name: skills/general/verification-before-completion
description: Require fresh verification evidence before any completion claim.
type: sub-skill
category: general
sources:
  - https://github.com/obra/superpowers/blob/main/skills/verification-before-completion/SKILL.md
---

# Verification Before Completion

## Setup
Use this before claiming work is complete, fixed, or passing. Run a fresh verification command in the same message where you claim success.

```text
Command: pnpm test
Output: 34/34 pass (exit 0)
Claim: "All tests pass"
```

## Core Patterns

### Identify the proving command
Pick the exact command that proves the claim.

```text
Claim: "Build passes"
Command: pnpm build
```

### Run the full command
Execute the full verification command, not a partial proxy.

```text
pnpm lint   (NOT sufficient for build claims)
pnpm build  (required for build claims)
```

### Read and verify the output
Confirm exit status and error count before stating results.

```text
Result: exit 0, 0 failures
```

### State the claim with evidence
Only claim success after the output confirms it.

```text
"Tests pass (34/34, exit 0)"
```

### If verification is missing, say so
Be explicit when you did not run the command and provide the exact command to run.

```text
"I did not run tests. Verify with: pnpm test"
```

## Common Mistakes

### Claiming success without running the command
Wrong
```text
"All tests pass."
```
Correct
```text
"I did not run tests. Verify with: pnpm test"
```
Explanation: Claims require fresh verification evidence.

### Using partial checks as proof
Wrong
```text
"Lint passed, so the build is fine."
```
Correct
```text
"Build verification requires: pnpm build"
```
Explanation: Each claim needs its own proof.

### Assuming a bug fix without reproducing
Wrong
```text
"Bug fixed." 
```
Correct
```text
"Reproduced original issue, then verified it no longer occurs."
```
Explanation: Fix claims require testing the original symptom.
