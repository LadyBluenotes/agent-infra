---
name: skills/javascript/node
description: >
  Node.js runtime guidance for fs/path/process APIs, streams, child processes,
  server-side scripts, environment boundaries, and platform behavior.
type: sub-skill
category: javascript
library: javascript
library_version: "Node 18+"
sources:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
---

# Node Runtime

## Setup

```js
import { readFile } from "node:fs/promises";

const load = async (path) => {
  const data = await readFile(path, "utf8");
  return JSON.parse(data);
};
```

## Core Patterns

### Use `node:` specifiers for built-ins

```js
import { join } from "node:path";
```

### Normalize environment input

```js
const port = Number(process.env.PORT ?? 3000);
```

## Common Mistakes

### HIGH: Using sync I/O in hot paths

```js
// Wrong
const data = readFileSync("./data.json", "utf8");
```

```js
// Correct
const data = await readFile("./data.json", "utf8");
```

### MEDIUM: Treating env vars as numbers without parsing

```js
// Wrong
const port = process.env.PORT || 3000;
```

```js
// Correct
const port = Number(process.env.PORT ?? 3000);
```
