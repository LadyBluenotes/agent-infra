# Code: JavaScript Patterns

## Apply When
- Writing or refactoring JavaScript/TypeScript with ES6+ syntax.
- Modernizing async flows, data transforms, or object/array handling.

## Do
- Prefer `const` and `let`; avoid `var`.
- Use destructuring, spread, and rest to keep data transformations immutable.
- Favor `async`/`await` with `Promise.all` for parallel work.
- Use array methods (`map`, `filter`, `reduce`) over manual loops where clarity improves.
- Use optional chaining and nullish coalescing for safe defaults.

## Examples

```javascript
const normalizeUser = ({ id, profile }) => ({
  id,
  name: profile?.name ?? "Unknown",
});

const totals = orders
  .filter((order) => order.status === "paid")
  .map((order) => order.amount)
  .reduce((sum, amount) => sum + amount, 0);
```

```javascript
const fetchAll = async (ids) => {
  const requests = ids.map((id) => fetch(`/api/items/${id}`));
  const responses = await Promise.all(requests);
  return Promise.all(responses.map((res) => res.json()));
};
```

```javascript
const updateState = (state, patch) => ({
  ...state,
  ...patch,
  updatedAt: Date.now(),
});
```

## Don't
- Don't mutate shared objects/arrays in-place when returning new values is clearer.
- Don't build callback chains when `async`/`await` reads better.
- Don't use implicit globals or rely on hoisting behavior.

## Output
- Keep transformations explicit and predictable.
- Prefer readable patterns over cleverness.

## Resources
- https://github.com/LadyBluenotes/agents/blob/main/plugins/javascript-typescript/skills/modern-javascript-patterns/SKILL.md
