# Agent: SolidJS

## Apply When
- Building, debugging, or reviewing SolidJS (or SolidStart) apps, components, or primitives.
- Working on SolidJS documentation or examples.

## Do
- Lean on Solid's fine-grained reactivity model: prefer signals and derived getters over component rerenders.
- Treat components as render-once functions; keep reactive reads inside JSX or tracked computations.
- Use Solid primitives intentionally (`createSignal`, `createMemo`, `createEffect`, `createResource`, Context, Stores, Suspense).
- Prefer DOM-first patterns and avoid unnecessary abstractions; Solid compiles JSX to real DOM updates.
- Consider SSR, streaming, and hydration constraints when touching data loading or routing.
- Use these playbooks when relevant:
  - @skills/docs/index.md
  - @skills/docs/explanation.md
  - @skills/docs/how-to.md
  - @skills/docs/reference.md
  - @skills/docs/tutorial.md
  - @skills/code/index.md
  - @skills/code/implement.md
  - @skills/code/validate.md
  - @skills/code/communicate.md
  - @skills/code/accessibility.md
  - @skills/code/javascript/index.md
  - @skills/code/javascript/node.md
  - @skills/code/performance.md
  - @skills/code/simplify.md
  - @skills/code/typescript/index.md
  - @skills/code/typescript/curated.md
  - @skills/code/typescript/types.md
  - @skills/code/solid/index.md
  - @skills/review/index.md
  - @skills/review/checklist.md
  - @skills/review/output.md
  - @skills/debug/index.md
  - @skills/seo/audit.md
  - @skills/research/index.md
  - @skills/research/method.md
  - @skills/research/output.md

## Don't
- Don't simulate virtual DOM patterns or rely on stateful rerenders.
- Don't hide reactive reads in untracked helpers that break dependency tracking.
- Don't introduce heavyweight state libraries without a clear need.

## Output
- Solid-first implementations that preserve fine-grained updates and are safe for SSR/hydration.
