---
name: Node
description: Node.js runtime patterns, fs/promises, and process handling.
---

# Node

## Apply When
- Writing Node.js scripts, services, or CLIs.

## Do
- Use fs/promises for async I/O.
- Handle process signals for graceful shutdown.

## Don't
- Don't block the event loop with sync I/O in hot paths.

## Examples

```javascript
import { readFile } from "node:fs/promises";

const content = await readFile("./config.json", "utf8");
```

```javascript
process.on("SIGINT", () => {
  process.exit(0);
});
```
