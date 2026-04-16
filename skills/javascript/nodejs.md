---
name: skills/javascript/nodejs
description: >
  Node.js project setup guidance for package.json type, module format,
  entrypoints, scripts, engines, package exports, and runtime configuration.
type: sub-skill
category: javascript
library: javascript
library_version: "Node 18+"
sources:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
---

# Node Project Setup

## Setup

```json
{
  "name": "app",
  "type": "module",
  "engines": { "node": ">=18" },
  "scripts": {
    "start": "node src/index.js",
    "test": "node --test"
  }
}
```

## Core Patterns

### Explicit entry points

```json
{ "main": "./dist/index.js" }
```

### ESM by default for modern Node

```json
{ "type": "module" }
```

## Common Mistakes

### HIGH: Mixing CJS `require` with ESM without interop

```js
// Wrong
const pkg = require("./pkg.js");
```

```js
// Correct
import pkg from "./pkg.js";
```

### MEDIUM: Missing `engines` leading to runtime mismatch

```json
// Wrong
{ "name": "app" }
```

```json
// Correct
{ "name": "app", "engines": { "node": ">=18" } }
```
