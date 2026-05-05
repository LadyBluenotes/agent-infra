---
name: skills/debug/ref/compare-snapshots
description: >
  Heap snapshot comparison helper reference for using compare_snapshots.js to
  summarize growing object counts and common browser memory leak indicators.
type: reference
category: debug
depth: reference
aliases:
  - compare heap snapshots
  - compare snapshots
tags:
  - memory
  - heap snapshot
  - comparison
sources:
  - https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/skills/memory-leak-debugging/references/compare_snapshots.js
---

# Compare Snapshots

Use `skills/debug/ref/compare_snapshots.js` only on local heap snapshot files
when a small summary is enough. Do not load raw `.heapsnapshot` files into
context.

```sh
node skills/debug/ref/compare_snapshots.js <baseline.heapsnapshot> <target.heapsnapshot>
```

The helper reports the largest growing object types and common browser leak
signals such as detached DOM, HTML nodes, event listeners, contexts, and
closures.
