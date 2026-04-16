---
name: skills/preferences/git
description: >
  Personal git preferences for scoped changes, no commits unless asked,
  no destructive history changes, and clear status reporting.
type: skill
category: preferences
depth: primary
tags:
  - preferences
  - git
  - commit
sources:
  - AGENTS.md
---

# Git Preferences

## Setup

Use this for git behavior preferences after hard safety rules are already applied.

## Core Patterns

### Keep changes scoped

```text
Touch files required for the task.
Ignore unrelated dirty files.
```

Do not bundle cleanup, formatting, or refactors unless required.

### Do not commit unless asked

```text
Commit only after explicit user request.
```

Staging or committing is a separate action from editing.

### Preserve user work

```text
Read dirty touched files.
Work with current content.
Never revert unrelated changes.
```

Assume dirty files came from the user unless proven otherwise.

## Common Mistakes

### HIGH Treating dirty files as cleanup

```text
Wrong: reset unrelated files before starting.
Correct: leave unrelated dirty files alone.
```

Unrelated changes are not task-owned.
