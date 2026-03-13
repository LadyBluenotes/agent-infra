---
name: skills/performance/tools
description: >
  Measurement, budgets, and monitoring guidance for front-end performance.
  Use when establishing a baseline, selecting Lighthouse or WebPageTest style
  tools, or turning findings into regression guards.
type: sub-skill
category: performance
sources:
  - https://github.com/thedaviddias/Front-End-Performance-Checklist
  - https://addyosmani.com/blog/performance-budgets/
---

# Performance Tools

## Setup
Use this when you need evidence, not guesses: baseline the page, identify the biggest bottleneck, set budgets, and keep regressions from returning.

## Core Patterns

### Start with repeatable lab measurements

```text
Baseline set:
- Lighthouse or PageSpeed Insights for audit categories
- WebPageTest for waterfall and network details
- browser DevTools for coverage, profiling, and local iteration
```

Use more than one tool because each one highlights a different failure mode.

### Pair lab data with production monitoring

```text
Monitoring stack:
- synthetic checks for key routes
- real user monitoring for live regressions
- alerts when core metrics cross budget
```

Lab tooling catches likely problems early, while production data confirms whether users are actually feeling them.

### Express budgets as limits the team must spend intentionally

```text
Example budgets:
- landing page JS <= 170 KB on mobile
- route image bytes <= 2 MB on desktop
- Lighthouse performance >= 80
- LCP <= 2.5 s on target conditions
```

Budgets work best when they are route-specific, measurable, and enforced in CI or monitoring.

### Turn findings into regression guards

```text
After a fix:
- save before/after evidence
- encode the limit in CI or monitoring
- recheck the route after nearby product changes
```

An optimization is incomplete if the team cannot tell when it slips back.

## Common Mistakes

### HIGH Using one score as the whole diagnosis

```text
Wrong:
- run Lighthouse once
- optimize only the top score line
```

```text
Correct:
- inspect the score, waterfall, coverage, and runtime traces together
```

One synthetic score can point to trouble, but it does not explain which resource or runtime path is actually responsible.

### HIGH Treating budgets as a one-time spreadsheet exercise

```text
Wrong:
- define a budget in a document
- never connect it to CI, PR checks, or monitoring
```

```text
Correct:
- enforce budgets in builds, pull requests, or alerts
```

Budgets only prevent regressions when they are attached to the delivery workflow.

### MEDIUM Measuring only desktop happy paths

```text
Wrong:
- test on a fast laptop and office network only
```

```text
Correct:
- check representative mobile constraints and key routes
```

Desktop-only runs hide the CPU and network pressure that usually makes front-end regressions obvious.

### MEDIUM Running audits without preserving before-and-after evidence

```text
Wrong:
- "it seems faster now"
```

```text
Correct:
- keep the previous metric, the change, and the new metric together
```

Without preserved evidence, later regressions are harder to catch and harder to explain.

## References

- @skills/performance/references/budgets.md
