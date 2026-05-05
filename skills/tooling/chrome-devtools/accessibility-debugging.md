---
name: skills/tooling/chrome-devtools/accessibility-debugging
description: >
  Chrome DevTools MCP accessibility debugging workflow for accessibility
  snapshots, labels, keyboard flow, tap targets, contrast checks, page metadata,
  and focused browser-side accessibility probes.
type: skill
category: tooling
depth: primary
aliases:
  - a11y debugging
  - chrome accessibility debugging
  - devtools accessibility
tags:
  - accessibility
  - chrome
  - devtools
  - mcp
  - browser
references:
  - skills/general/accessibility
  - skills/tooling/chrome-devtools/ref/a11y-snippets
sources:
  - https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/skills/a11y-debugging/SKILL.md
---

# Chrome DevTools Accessibility Debugging

## Setup

Use this when accessibility behavior needs real browser evidence: accessible
names, roles, labels, focus order, keyboard interaction, tap target size, color
contrast, or document-level accessibility metadata.

## Core Patterns

### Inspect semantics before styling

```text
Accessibility snapshot -> DOM source -> focused probe if needed.
```

Prefer native accessibility and DOM evidence over visual guesses.

### Verify keyboard and focus in the browser

Check whether each interactive control is reachable, visible focus is present,
and activation works without a pointer.

### Use snippets only for narrow checks

Load `skills/tooling/chrome-devtools/ref/a11y-snippets` when native snapshots do
not answer the question. Treat snippet output as a lead, then verify source
ownership before changing code.

## Common Mistakes

### HIGH Treating placeholders as labels

Wrong
```html
<input placeholder="Email">
```

Correct
```html
<label for="email">Email</label>
<input id="email">
```

### HIGH Fixing contrast by eye

Wrong
```text
Looks readable on this screen.
```

Correct
```text
Measure contrast or use an accessibility checker, then verify against the intended threshold.
```
