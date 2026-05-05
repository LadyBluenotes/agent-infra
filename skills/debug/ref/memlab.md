---
name: skills/debug/ref/memlab
description: >
  Memlab reference for browser memory leak analysis, three-snapshot workflows,
  find-leaks, analyze snapshot, and retainer trace interpretation.
type: reference
category: debug
depth: reference
aliases:
  - memlab
tags:
  - memory
  - leaks
  - memlab
  - heap snapshot
sources:
  - https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/skills/memory-leak-debugging/references/memlab.md
---

# Memlab

[Memlab](https://facebook.github.io/memlab/) is an E2E testing and analysis
framework for finding JavaScript memory leaks.

## Rule

Never read raw `.heapsnapshot` files directly into context. Use `memlab`
commands to analyze them.

## Snapshot sequence

Use three snapshots:

1. Baseline: before the suspect action.
2. Target: after the suspect action.
3. Final: after reversing the action.

```sh
npx memlab find-leaks --baseline <path-to-baseline> --target <path-to-target> --final <path-to-final>
```

To inspect one snapshot:

```sh
npx memlab analyze snapshot --snapshot <path-to-snapshot>
```

Use retainer traces to guide source inspection.
