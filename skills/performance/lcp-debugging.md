---
name: skills/performance/lcp-debugging
description: >
  Largest Contentful Paint debugging workflow with Chrome DevTools MCP,
  Performance API evidence, LCP element identification, load subpart analysis,
  render delay isolation, and targeted LCP optimizations.
type: skill
category: performance
depth: primary
aliases:
  - lcp debugging
  - optimize lcp
  - debug lcp
tags:
  - lcp
  - core web vitals
  - chrome
  - devtools
  - performance
references:
  - skills/performance/ref/lcp-breakdown
  - skills/performance/ref/lcp-snippets
  - skills/performance/ref/elements-and-size
  - skills/performance/ref/optimization-strategies
  - skills/tooling/chrome-devtools/mcp
sources:
  - https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/skills/debug-optimize-lcp/SKILL.md
---

# LCP Debugging

## Setup

Use this when the task is to debug or improve Largest Contentful Paint with
real browser evidence.

## Core Patterns

### Identify the LCP element first

```text
URL -> trace or Performance API -> LCP element -> owning markup/resource.
```

Do not optimize generic page assets until the actual LCP element and its
resource path are known.

### Break LCP into subparts

Load `skills/performance/ref/lcp-breakdown` when choosing the bottleneck:
TTFB, resource load delay, resource load duration, or element render delay.

### Use Chrome evidence for browser-owned timing

Use Chrome DevTools MCP traces, snapshots, network entries, and focused
Performance API snippets. Use repository tests only for repo-owned contracts.

### Patch the smallest owned cause

Examples:

```text
Resource discovered late -> make it discoverable in initial HTML.
Viewport LCP image lazy-loaded -> remove lazy loading for that image.
Large LCP image unprioritized -> add fetchpriority="high" where supported.
Render blocked by app script -> defer, split, or move the blocking work.
```

## Common Mistakes

### HIGH Optimizing before identifying the LCP element

Wrong
```text
Compress random images and claim LCP improved.
```

Correct
```text
Find the LCP element, measure its bottleneck, then optimize that path.
```

### HIGH Claiming improvement without a before/after trace

Wrong
```text
This should improve LCP.
```

Correct
```text
Report baseline and after timings from the same scenario.
```
