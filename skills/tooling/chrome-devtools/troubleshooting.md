---
name: skills/tooling/chrome-devtools/troubleshooting
description: >
  Chrome DevTools MCP troubleshooting workflow for connection failures, missing
  browser tools, blank pages, stale sessions, protocol errors, and environment
  setup issues.
type: skill
category: tooling
depth: primary
aliases:
  - chrome devtools troubleshooting
  - devtools mcp troubleshooting
  - chrome mcp troubleshooting
tags:
  - chrome
  - devtools
  - mcp
  - troubleshooting
references:
  - skills/tooling/chrome-devtools/cli
  - skills/debug/local-environment
sources:
  - https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/skills/troubleshooting/SKILL.md
---

# Chrome DevTools Troubleshooting

## Setup

Use this when Chrome DevTools MCP cannot connect, tools are unavailable, Chrome
does not launch, the target page is blank, or browser automation behaves
differently than expected.

## Core Patterns

### Separate setup failure from page failure

```text
CLI status:
MCP tool availability:
Browser launch:
Page navigation:
Page interaction:
```

Find the first failing layer before changing application code.

### Capture exact command truth

```sh
chrome-devtools status
node --version
npm --version
```

Use the actual output. If a command is unavailable, state that as evidence.

### Restart only task-owned sessions

Stop or restart Chrome DevTools MCP processes only when they were started for
the current task or the user confirms it is safe.

### Reproduce with the smallest page flow

Use a stable URL, wait for page idle where possible, then inspect console,
network, and DOM state. Avoid running application changes until browser setup
is known good.

## Common Mistakes

### HIGH Debugging app code before setup

Wrong
```text
Patch the app because browser automation failed.
```

Correct
```text
Verify CLI status, tool availability, browser launch, and navigation first.
```

### MEDIUM Losing useful failure state

Wrong
```text
Restart everything before capturing logs or status.
```

Correct
```text
Capture the error, status, and target URL first; restart only if it tests a clear hypothesis.
```
