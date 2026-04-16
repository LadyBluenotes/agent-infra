---
name: skills/javascript/browser
description: >
  Browser JavaScript guidance for DOM APIs, events, fetch, storage, URL/location,
  timers, observers, and client-side platform behavior.
type: sub-skill
category: javascript
library: javascript
library_version: "ES2023"
sources:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
  - https://javascript.info/
---

# Browser

## Setup

```js
const isBrowser = typeof window !== "undefined";

const fetchJson = async (url) => {
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};
```

## Core Patterns

### Feature detection before using APIs

```js
const canStore = isBrowser && "localStorage" in window;
if (canStore) {
  localStorage.setItem("theme", "light");
}
```

### Event listeners with cleanup

```js
const onResize = () => console.log(window.innerWidth);
window.addEventListener("resize", onResize);
// later
window.removeEventListener("resize", onResize);
```

### DOM updates without HTML injection

```js
const el = document.querySelector("#status");
el.textContent = "Loaded";
```

## Common Mistakes

### HIGH: Assuming `window` exists during SSR

```js
// Wrong
const width = window.innerWidth;
```

```js
// Correct
const width = typeof window === "undefined" ? 0 : window.innerWidth;
```

### HIGH: Ignoring non-OK fetch responses

```js
// Wrong
const data = await (await fetch("/api/user")).json();
```

```js
// Correct
const res = await fetch("/api/user");
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const data = await res.json();
```

### MEDIUM: Using `innerHTML` with untrusted content

```js
// Wrong
el.innerHTML = userInput;
```

```js
// Correct
el.textContent = userInput;
```
