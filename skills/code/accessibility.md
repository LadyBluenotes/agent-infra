# Code: Accessibility

## Apply When
- Building or reviewing UI/UX, frontend components, or content-heavy pages.
- Auditing interfaces for WCAG 2.2 compliance.

## Do
- Prefer semantic HTML before ARIA.
- Ensure keyboard access and visible focus states.
- Verify color contrast and non-color cues for meaning.
- Provide text alternatives for non-text content.
- Validate labels, headings, and landmarks.

## Examples

```html
<a href="#main" class="skip-link">Skip to main content</a>
<main id="main">...</main>
```

```html
<label for="email">Email</label>
<input id="email" type="email" aria-describedby="email-help" />
<p id="email-help">We will never share your email.</p>
```

```css
:focus-visible {
  outline: 3px solid #0b57d0;
  outline-offset: 2px;
}
```

```html
<img src="chart.png" alt="Q2 revenue up 18% from Q1" />
<img src="divider.png" alt="" />
```

```javascript
const trapFocus = (container) => {
  const items = container.querySelectorAll(
    "a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])",
  );
  const first = items[0];
  const last = items[items.length - 1];

  container.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
};
```

## Don't
- Don't hide focus outlines without providing a visible replacement.
- Don't rely on color alone for status or instructions.
- Don't use ARIA to replace native controls when native semantics exist.

## Output
- UI work includes keyboard, contrast, and label coverage.
- Audit results identify the impacted component and guideline category.

## Resources
- https://github.com/LadyBluenotes/agents/blob/main/plugins/accessibility-compliance/skills/wcag-audit-patterns/SKILL.md
