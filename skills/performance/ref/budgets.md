---
name: skills/performance/ref/budgets
description: >
  Reference for front-end performance budgets and regression guardrails. Use
  when the main tools skill needs more detail on budget shape or enforcement.
type: reference
category: performance
sources:
  - https://addyosmani.com/blog/performance-budgets/
  - https://github.com/thedaviddias/Front-End-Performance-Checklist
---

# Budget References

## Budget Types

| Budget type | Example |
| --- | --- |
| Timing | LCP <= 2.5 s on target mobile conditions |
| Byte size | Initial JS <= 170 KB on mobile |
| Resource count | <= 60 requests on the landing page |
| Audit score | Lighthouse performance >= 80 |

## Good Budget Properties

- Scoped to a route, screen, or flow instead of one vague site-wide number.
- Tied to target devices and network conditions.
- Attached to CI, PR checks, or monitoring alerts.
- Understood as a tradeoff boundary, not an aspirational note.

## Team Usage

- Use budgets to force explicit tradeoff conversations early.
- Record which asset or feature spent the budget.
- Revisit budgets when product scope changes, but do not loosen them casually.
