---
name: skills/tooling/chrome-devtools/ref/installation
description: >
  Chrome DevTools MCP CLI installation reference for global npm install,
  status checks, PATH issues, permission errors, and stale CLI versions.
type: reference
category: tooling
depth: reference
aliases:
  - chrome-devtools installation
  - chrome devtools install
tags:
  - chrome
  - devtools
  - installation
  - npm
sources:
  - https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/skills/chrome-devtools-cli/references/installation.md
---

# Installation

Confirm before running global install commands.

```sh
npm i chrome-devtools-mcp@latest -g
chrome-devtools status
```

## Troubleshooting

- Command not found: ensure the global npm `bin` directory is in `PATH`.
- Permission errors: avoid `sudo`; prefer a Node version manager or a different npm global directory.
- Old version running: run `chrome-devtools stop && npm uninstall -g chrome-devtools-mcp` before reinstalling, or confirm which binary appears first in `PATH`.
