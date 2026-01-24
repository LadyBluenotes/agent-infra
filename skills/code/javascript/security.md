---
name: Security
description: Common JS security footguns and safe patterns.
---

# Security

## Apply When
- Handling untrusted input or constructing dynamic objects.

## Do
- Use Object.create(null) for untrusted key maps.
- Validate URLs and paths explicitly.

## Don't
- Don't use eval or Function for dynamic code.

## Examples

```javascript
const map = Object.create(null);
map[userInput] = true;
```

```javascript
const url = new URL(input, "https://example.com");
```
