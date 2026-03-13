---
name: skills/performance/references/font-loading
description: >
  Deeper webfont loading reference for FOIT, FOUT, FOFT, selective preload,
  and variant management tradeoffs.
type: reference
category: performance
sources:
  - https://www.zachleat.com/web/comprehensive-webfonts/#font-face
  - https://github.com/thedaviddias/Front-End-Performance-Checklist
---

# Font Loading References

## Rendering Strategies

| Strategy | Outcome | When it fits |
| --- | --- | --- |
| FOIT | Text stays invisible while the font loads | Usually avoid |
| FOUT | Fallback text appears immediately, then swaps | Good default |
| FOFT | Initial fallback or subset, then fuller family later | Useful for advanced multi-variant setups |

## Practical Guidance

- Add `font-display` deliberately; `swap`, `fallback`, or `optional` each trade brand fidelity against immediate readability.
- Preload only the most important one or two fonts, not the entire family.
- Self-hosting makes advanced staged-loading strategies easier to control.
- Font subsetting can help significantly, but licensing and operational complexity may limit it.

## Warning Signs

- More than a handful of variants for one page shell.
- Font payload large enough to compete with CSS or hero images.
- Invisible text accepted as a normal outcome.
