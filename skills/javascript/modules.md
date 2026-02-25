---
name: skills/javascript/modules
description: ES module syntax, static imports, and dynamic import.
type: sub-skill
category: javascript
library: javascript
library_version: "ES2023"
sources:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
  - https://javascript.info/modules
---

# Modules

## Setup

```js
// math.js
export const add = (a, b) => a + b;

// index.js
import { add } from "./math.js";
```

## Core Patterns

### Static imports at top level

```js
import { add } from "./math.js";
```

### Dynamic imports for optional code

```js
const { format } = await import("./format.js");
```

### Explicit file extensions for ESM

```js
import { add } from "./math.js";
```

## Common Mistakes

### HIGH: Using `import` outside module context

```js
// Wrong (script context)
import { add } from "./math.js";
```

```js
// Correct
// Ensure type="module" in browsers or "type": "module" in package.json
```

### MEDIUM: Assuming dynamic import returns a default export

```js
// Wrong
const format = await import("./format.js");
format("x");
```

```js
// Correct
const mod = await import("./format.js");
mod.format("x");
```
