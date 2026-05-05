---
name: skills/tooling/chrome-devtools/cli
description: >
  Chrome DevTools MCP CLI guidance for installing, checking status, starting,
  stopping, and troubleshooting the `chrome-devtools` command.
type: skill
category: tooling
depth: primary
aliases:
  - chrome-devtools cli
  - chrome devtools cli
  - chrome-devtools command
tags:
  - chrome
  - devtools
  - cli
  - mcp
references:
  - skills/tooling/chrome-devtools/ref/installation
  - skills/tooling/chrome-devtools/troubleshooting
sources:
  - https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/skills/chrome-devtools-cli/SKILL.md
---

# Chrome DevTools CLI

## Setup

Use this when installing or diagnosing the `chrome-devtools` CLI for Chrome
DevTools MCP.

## Core Patterns

### Check installation before use

```sh
chrome-devtools status
```

If the command is missing, load
`skills/tooling/chrome-devtools/ref/installation`.

### Keep CLI changes explicit

Install, uninstall, start, and stop commands can change the local environment.
Confirm before running commands that install packages globally or stop running
services.

### Diagnose PATH and stale versions first

```text
which chrome-devtools
chrome-devtools status
npm root -g
npm bin -g
```

Use command truth before claiming which binary is active.

## Common Mistakes

### HIGH Installing globally without confirmation

Wrong
```text
npm i chrome-devtools-mcp@latest -g
```

Correct
```text
Propose the install and wait for confirmation.
```

### MEDIUM Assuming one package manager

Wrong
```text
Use whichever global installer is nearby.
```

Correct
```text
Check the user's Node/npm setup and follow their environment conventions.
```
