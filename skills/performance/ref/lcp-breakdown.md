---
name: skills/performance/ref/lcp-breakdown
description: >
  LCP breakdown reference for TTFB, resource load delay, resource load duration,
  element render delay, and choosing the right Largest Contentful Paint fix.
type: reference
category: performance
depth: reference
aliases:
  - lcp breakdown
tags:
  - lcp
  - core web vitals
  - performance
sources:
  - https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/skills/debug-optimize-lcp/references/lcp-breakdown.md
---

# LCP Breakdown

LCP measures the time from when the user starts loading the page until the
largest image or text block is rendered within the viewport. A good target is
2.5 seconds or less for at least 75% of page visits.

## Subparts

| LCP subpart | Optimal share | Description |
| --- | --- | --- |
| TTFB | About 40% | Navigation start until the first byte of the HTML response. |
| Resource load delay | Less than 10% | TTFB until the browser starts loading the LCP resource. |
| Resource load duration | About 40% | Time spent loading the LCP resource. |
| Element render delay | Less than 10% | LCP resource loaded until the element renders. |

## Diagnosis

- Large TTFB to FCP delta: likely render-blocking assets or client rendering.
- Large FCP to LCP delta: likely late resource discovery or main-thread work.
- Large resource load delay: resource not discoverable early or deprioritized.
- Large element render delay: rendering blocked by CSS, scripts, or long tasks.
