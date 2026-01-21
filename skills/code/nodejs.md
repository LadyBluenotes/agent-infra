# Code: Node.js

## Apply When
- Building Node.js backend services, APIs, or background workers.
- Implementing middleware, routing, validation, or error handling.

## Do
- Keep a layered structure (routes/controllers/services/data) when it clarifies intent.
- Centralize error handling and use typed error classes.
- Validate inputs at the edge (request body, params, env).
- Use async handlers that forward errors to middleware.
- Prefer configuration via environment variables.

## Examples

```typescript
import express from "express";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
```

```typescript
export class HttpError extends Error {
  constructor(readonly status: number, message: string) {
    super(message);
  }
}

export const errorHandler = (
  err: Error,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) => {
  const status = err instanceof HttpError ? err.status : 500;
  res.status(status).json({ error: err.message });
};
```

```typescript
const asyncHandler =
  (fn: express.RequestHandler): express.RequestHandler =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
```

```typescript
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

const validateBody = (schema: z.ZodSchema) =>
  (req: express.Request, _res: express.Response, next: express.NextFunction) => {
    schema.parse(req.body);
    next();
  };
```

## Don't
- Don't mix controller and data access logic in the same module.
- Don't let unvalidated input reach services or persistence layers.
- Don't swallow errors; propagate them to a handler.

## Output
- Keep routing thin and business logic testable.
- Favor predictable, consistent response shapes.

## Resources
- https://github.com/LadyBluenotes/agents/blob/main/plugins/javascript-typescript/skills/nodejs-backend-patterns/SKILL.md
