---
name: skills/general/process-hygiene
description: >
  Stop task-owned long-running processes and clean only task-owned temp/cache
  files so agent work does not leave waste on the system.
type: sub-skill
category: general
---

# Process Hygiene

## Setup
Use this when starting dev servers, watchers, background tasks, or writing
temporary files.

```bash
tmpdir="$(mktemp -d /tmp/ladybluenotes-task-XXXXXX)"
```

Write task temp files under `/tmp/ladybluenotes-*` or repo-local
`.agents/tmp/`. Write task cache files under repo-local `.agents/cache/`.

## Core Patterns

### Track long-running processes

```json
{
  "owner": "ladybluenotes",
  "pid": 12345,
  "command": "npm run dev",
  "cwd": "/path/to/repo"
}
```

Record task-owned processes under `.agents/processes/*.json` when they must
run beyond a single command call.

### Stop what you start

```bash
ladybluenotes skills clean --yes
```

Before finishing, stop tracked task-owned processes unless the user asked to
keep them running. Report any process intentionally left running.

### Clean owned temp/cache paths only

```bash
ladybluenotes skills clean --yes --path .agents/tmp/build-check
```

Clean `/tmp/ladybluenotes-*`, `.agents/tmp/`, and `.agents/cache/`. Use
`--global` only when user-level `.agents/` cleanup is intended.

## Common Mistakes

### HIGH Killing untracked processes

```bash
# Wrong
pkill node
```

```bash
# Correct
ladybluenotes skills clean --yes
```

Broad process kills can terminate unrelated user work. Only stop processes
tracked as `owner: "ladybluenotes"`.

### HIGH Deleting shared caches

```bash
# Wrong
rm -rf ~/.cache node_modules
```

```bash
# Correct
ladybluenotes skills clean --yes
```

Shared caches may contain user data or expensive dependencies. Only delete
task-owned temp/cache paths unless the user explicitly approves more.

### MEDIUM Leaving dev servers running

```text
Started server on :5173 and ended without stopping or reporting it.
```

```text
Stopped server pid 12345 before final response.
```

Long-running processes must be stopped or explicitly reported with their
purpose and PID.
