---
name: skills/performance/javascript
description: >
  JavaScript delivery and runtime audit guidance for front-end performance.
  Use when reducing shipped JS, choosing `async` or `defer`, profiling
  execution, or controlling dependency bloat.
type: sub-skill
category: performance
sources:
  - https://github.com/thedaviddias/Front-End-Performance-Checklist
  - https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4
---

# JavaScript Performance

## Setup
Use this when parse, compile, or execution time from shipped JavaScript is hurting first load or interactivity.

## Core Patterns

### Minify and ship only the code you need

```text
Build goals:
- minified production bundles
- dead-code elimination where supported
- route or feature level code splitting where it reduces initial work
```

JavaScript has both download cost and CPU cost, so reducing shipped code helps twice.

### Choose `defer` by default for document scripts

```html
<script defer src="/assets/app.js"></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXX"></script>
```

Use `defer` for scripts that participate in page startup order and `async` for independent scripts that can run whenever they finish.

### Keep inline body scripts rare and deliberate

```html
<body>
  <main>...</main>
  <script defer src="/assets/app.js"></script>
</body>
```

Prefer external files so the browser can cache, prioritize, and schedule them more predictably.

### Audit dependencies as a product decision

```text
Dependency review:
- confirm the feature is needed
- compare lighter alternatives
- inspect install size and runtime size
- add size checks in CI for critical bundles
```

Every dependency spends budget, so package selection should be reviewed like any other performance tradeoff.

## Common Mistakes

### HIGH Loading startup scripts without `defer` or `async`

```html
<!-- Wrong -->
<script src="/assets/app.js"></script>
```

```html
<!-- Correct -->
<script defer src="/assets/app.js"></script>
```

Blocking document parsing for a normal startup bundle makes initial rendering slower for no gain.

### HIGH Treating third-party libraries as free

```text
Wrong:
- add analytics, chat, A/B testing, maps, and animation libraries
- never measure their network or CPU cost
```

```text
Correct:
- measure each third-party script separately
- keep only vendors that justify their cost
```

Third-party scripts often add long tasks and network contention outside your normal bundle review process.

### MEDIUM Using `async` for scripts that rely on execution order

```html
<!-- Wrong -->
<script async src="/assets/vendor.js"></script>
<script async src="/assets/app.js"></script>
```

```html
<!-- Correct -->
<script defer src="/assets/vendor.js"></script>
<script defer src="/assets/app.js"></script>
```

`async` runs scripts as soon as they arrive, so dependent scripts can execute in the wrong order.

### MEDIUM Letting dependency growth happen without a budget

```text
Wrong:
- no bundle budget
- no PR size checks
- discover regressions after release
```

```text
Correct:
- define bundle budgets per app or route
- fail or warn when additions exceed them
```

Without an explicit budget, dependency bloat accumulates in small changes that are easy to justify one by one.

## References

- @skills/performance/ref/javascript-delivery.md
