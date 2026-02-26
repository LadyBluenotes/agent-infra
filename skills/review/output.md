---
name: skills/review/output
description: Structured review feedback with issues, suggestions, and questions.
type: sub-skill
category: review
---

# Output

## Setup
Use this when writing review feedback.

## Core Patterns

### Separate concerns
Group feedback into Issues (must-fix), Suggestions (nice-to-have), and Questions (need clarification).

### Be actionable
Reference the exact file or location and describe the expected change.

### Call out severity
Make it clear which items block approval.

## Common Mistakes

### Mixing severity
Wrong
```text
"This might be a bug" (no severity indicated).
```
Correct
```text
"Issue: This causes a crash when X is null." 
```
Explanation: Severity clarifies what must be fixed before approval.

### Vague feedback
Wrong
```text
"This feels risky."
```
Correct
```text
"Suggestion: add a guard for null sessions in handler X." 
```
Explanation: Specific guidance speeds up fixes.
