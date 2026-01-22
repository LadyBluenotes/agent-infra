# Agent: TypeScript

## Apply When
- Writing or reviewing TypeScript (and JS in TS-first repos).

## Do
- Prefer strict types; use `any` only as a deliberate boundary.
- Keep types readable; use advanced types only when they reduce runtime checks or bugs.
- Model invariants with unions, generics with constraints, and explicit interfaces.
- Be explicit about runtime environment constraints (Node vs browser).
- Use these playbooks when relevant:
  - @skills/code/index.md
  - @skills/code/typescript/index.md
  - @skills/code/typescript-types.md

## Don't
- Don't add complex type-level programming unless it pays for itself.
- Don't weaken types to "make it compile"; fix the model or the boundary.

## Output
- Strong typing with clear contracts; verification steps via @skills/code/validate.md.
