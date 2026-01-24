---
name: API Modeling
description: Public API types and DTO modeling.
---

# API Modeling

## Apply When
- Defining public APIs or DTOs.

## Do
- Use discriminated unions for API responses.
- Keep DTOs explicit and stable.

## Don't
- Don't expose internal types directly.

## Examples

```ts
type ApiResponse<T> =
  | { status: "ok"; data: T }
  | { status: "error"; error: string };
```

```ts
type UserDto = { id: string; name: string; createdAt: string };
```
