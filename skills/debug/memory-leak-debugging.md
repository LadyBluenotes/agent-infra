---
name: skills/debug/memory-leak-debugging
description: >
  Browser memory leak debugging workflow with Chrome DevTools MCP heap
  snapshots, baseline-target-final comparison, retainer traces, detached DOM
  node checks, closures, event listeners, caches, and Memlab analysis.
type: skill
category: debug
depth: primary
aliases:
  - memory leak debugging
  - browser memory leak
  - heap snapshot debugging
tags:
  - memory
  - leak
  - chrome
  - devtools
  - heap snapshot
references:
  - skills/debug/ref/common-leaks
  - skills/debug/ref/memlab
  - skills/debug/ref/compare-snapshots
  - skills/tooling/chrome-devtools/mcp
sources:
  - https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/skills/memory-leak-debugging/SKILL.md
---

# Memory Leak Debugging

## Setup

Use this when browser memory grows after a repeatable user action, detached DOM
nodes appear, heap snapshots need comparison, or retainer traces point at
application objects.

## Core Patterns

### Use three snapshots

```text
Baseline: before suspect action.
Target: after suspect action.
Final: after reversing the action, such as closing a modal or navigating away.
```

Growth that remains in the final snapshot is the useful signal.

### Never read raw heap snapshots into context

Heap snapshots are too large. Use Chrome DevTools MCP tools, Memlab, or focused
scripts to summarize them.

### Confirm the retainer path before patching

```text
Growing object -> retainer path -> owning source -> cleanup point.
```

Detached nodes are leads, not automatic bugs. Confirm whether they are
intentional caches before changing code.

### Patch lifecycle cleanup at the owner

Common fixes include removing event listeners, clearing timers, aborting
subscriptions, limiting caches, and releasing DOM references when components
unmount or flows close.

## Common Mistakes

### HIGH Reading heap snapshots directly

Wrong
```text
Open a `.heapsnapshot` in the context window.
```

Correct
```text
Use DevTools, Memlab, or a small summarizer and inspect only the result.
```

### HIGH Treating every detached node as a leak

Wrong
```text
Remove all detached DOM references immediately.
```

Correct
```text
Check the retainer trace and confirm whether the detached tree is an intentional cache.
```
