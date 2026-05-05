---
name: skills/tooling/chrome-devtools/mcp
description: >
  Chrome DevTools MCP workflow for browser automation, page inspection,
  performance traces, DOM snapshots, console/network evidence, and targeted
  browser debugging through MCP tools.
type: skill
category: tooling
depth: primary
aliases:
  - chrome devtools mcp
  - devtools mcp
  - browser mcp
tags:
  - chrome
  - devtools
  - mcp
  - browser
  - debugging
references:
  - skills/tooling/chrome-devtools/troubleshooting
  - skills/tooling/chrome-devtools/accessibility-debugging
  - skills/performance/lcp-debugging
  - skills/debug/memory-leak-debugging
sources:
  - https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/skills/chrome-devtools/SKILL.md
---

# Chrome DevTools MCP

## Setup

Use this when browser truth matters: visual state, DOM state, console errors,
network requests, performance traces, accessibility snapshots, or user flows in
Chrome.

## Core Patterns

### Start from browser evidence

```text
Open page -> wait for stable state -> capture console/network/DOM evidence.
```

Use repository tests for owned behavior, but use Chrome DevTools MCP when the
bug depends on real browser execution, rendering, layout, resources, or user
interaction.

### Keep each browser probe targeted

```text
Question:
Tool:
Expected signal:
```

Choose one signal at a time. Prefer snapshots, console messages, network
entries, and performance traces over broad script injection.

### Preserve page state

Navigate only when needed. Before actions that change state, capture the current
URL, visible UI, and relevant console/network context.

### Pair browser findings with repo truth

```text
Browser evidence -> relevant source file -> smallest repo-owned change.
```

Do not patch based only on page symptoms. Confirm the source boundary that owns
the behavior.

## Common Mistakes

### HIGH Treating MCP output as the fix

Wrong
```text
Patch whatever seems related after seeing a console error.
```

Correct
```text
Use the browser signal to find the owning source path, then patch that boundary.
```

### MEDIUM Running broad page scripts first

Wrong
```text
Inject a large script before inspecting native DevTools signals.
```

Correct
```text
Use snapshots, console, network, and trace tools first; inject only focused snippets.
```

### MEDIUM Ignoring browser setup

Wrong
```text
Assume Chrome DevTools MCP is available because the skill matched.
```

Correct
```text
Check available tools or the CLI status before promising browser verification.
```
