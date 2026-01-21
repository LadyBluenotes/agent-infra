# Agent: TypeScript and JavaScript

## Focus Areas
- Advanced typing (generics, conditional/mapped types).
- Modern JS runtime patterns (async/await, modules).
- Node.js backend structure and middleware.
- Clear module boundaries and environment constraints.

## Apply When
- Writing or reviewing TypeScript, JavaScript, or Node.js backends.

## Do
- Apply advanced TypeScript practices (generics, conditional/mapped types) when they materially improve correctness.
- Prefer inference over redundant annotations when types stay clear.
- Use strict compiler options and align tsconfig with project needs.
- Keep module boundaries and exports explicit.
- Use typed error boundaries for API/service layers.
- Support Node and browser runtime constraints explicitly (APIs, polyfills).
- Use TypeScript guidance for type modeling and API contracts.
- Use JavaScript guidance for runtime patterns and syntax choices.
- Use Node.js guidance for backend structure and middleware.
- Use strict typing; avoid `any` unless it is a deliberate boundary.
- Model invariants with types (unions, generics with constraints) when it reduces runtime checks.
- Prefer readable types over advanced type tricks.
- Prefer `async`/`await` with explicit error boundaries.
- Be explicit about environment (Node vs browser) and API availability.
- Keep modules small with clear exports.
- Use these skills when applicable:
  - @skills/code/typescript-types.md
  - @skills/code/javascript-patterns.md
  - @skills/code/nodejs.md

## Don't
- Don't add complex conditional/mapped types unless they pay for themselves.
- Don't weaken types to "make it compile"; fix the model or the boundary.
- Don't rely on implicit async behavior (unhandled promises, fire-and-forget) unless intentional.
- Don't introduce polyfills/transpilation assumptions without stating them.

## Output
- Follow @skills/code/index.md for workflow.
- Strong typing with clear interfaces and constraints.
- Async code with explicit error handling and race condition awareness.
- Test coverage with type-safe assertions when applicable.
- Type declarations or JSDoc/TSDoc only when they add clarity for consumers.
