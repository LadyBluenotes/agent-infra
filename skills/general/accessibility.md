---
name: skills/general/accessibility
description: >
  Accessibility guidance for UI audits, WCAG-aligned checks, keyboard flow,
  focus management, labels, semantic HTML, color contrast, and screen readers.
type: sub-skill
category: general
sources:
  - https://github.com/LadyBluenotes/agents/blob/main/plugins/accessibility-compliance/skills/wcag-audit-patterns/SKILL.md
---

# Accessibility
## Setup
Use this when building or reviewing UI/UX, frontend components, or content-heavy pages.

## Core Patterns

### Prefer semantic HTML
Use native elements before ARIA. Add ARIA only to clarify semantics that cannot be expressed otherwise.

```html
<button type="button">Save</button>
```

### Keyboard and focus
Ensure every interactive element is reachable and has a visible focus style.

```css
:focus-visible {
  outline: 3px solid #0b57d0;
  outline-offset: 2px;
}
```

### Labels and landmarks
Provide explicit labels and meaningful landmarks so screen readers can navigate.

```html
<label for="email">Email</label>
<input id="email" type="email" aria-describedby="email-help" />
<p id="email-help">We will never share your email.</p>
```

### Non-text alternatives
Use meaningful alt text for informative images and empty alt text for decorative images.

```html
<img src="chart.png" alt="Q2 revenue up 18% from Q1" />
<img src="divider.png" alt="" />
```

## Common Mistakes

### Clickable divs
Wrong
```html
<div onclick="save()">Save</div>
```
Correct
```html
<button type="button" onclick="save()">Save</button>
```
Explanation: Native controls provide keyboard support and correct semantics.

### Missing labels
Wrong
```html
<input type="email" placeholder="Email" />
```
Correct
```html
<label for="email">Email</label>
<input id="email" type="email" />
```
Explanation: Placeholders are not reliable labels for assistive technology.

### Color-only meaning
Wrong
```html
<span class="status-green">Active</span>
```
Correct
```html
<span class="status status--active" aria-label="Status: active">Active</span>
```
Explanation: Provide non-color cues so meaning is accessible to all users.
