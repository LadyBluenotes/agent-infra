---
name: skills/performance/references/javascript-delivery
description: >
  Deeper JavaScript delivery reference for script loading attributes,
  third-party cost review, and dependency budget enforcement.
type: reference
category: performance
sources:
  - https://github.com/thedaviddias/Front-End-Performance-Checklist
  - https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4
---

# JavaScript Delivery References

## `async` vs `defer`

| Attribute | Fetch | Execute | Best for |
| --- | --- | --- | --- |
| none | During parse | Immediately when reached | Rarely ideal for startup bundles |
| `defer` | In parallel | After parse, in document order | App startup scripts with dependencies |
| `async` | In parallel | As soon as available, out of order | Independent scripts like analytics |

## Third-Party Review Questions

- Is the script essential to the route's primary task?
- What is its network cost, parse cost, and long-task impact?
- Can it load after interaction instead of during startup?
- Is there a lighter or server-side alternative?

## Budget Patterns

- Define JS budgets per route, not only one global app number.
- Separate first-load bundle budgets from long-tail async chunks.
- Add PR or CI enforcement so dependency growth is visible before merge.
