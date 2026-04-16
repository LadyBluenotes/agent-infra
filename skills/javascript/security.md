---
name: skills/javascript/security
description: >
  JavaScript security guidance for untrusted input, injection, eval/function
  constructors, XSS-prone DOM writes, path traversal, and safe parsing.
type: sub-skill
category: javascript
library: javascript
library_version: "ES2023"
sources:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
---

# Security

## Setup

```js
const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (ch) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch])
  );
```

## Core Patterns

### Avoid `eval` and `Function`

```js
const parse = JSON.parse;
```

### Use textContent for DOM output

```js
el.textContent = userInput;
```

## Common Mistakes

### HIGH: String concatenation in HTML injection paths

```js
// Wrong
el.innerHTML = `<p>${userInput}</p>`;
```

```js
// Correct
el.textContent = userInput;
```

### HIGH: Using `eval` for parsing

```js
// Wrong
const value = eval(input);
```

```js
// Correct
const value = JSON.parse(input);
```
