---
name: typescript
description: This skill should be used when the user asks to "optimize TypeScript performance", "speed up tsc compilation", "configure tsconfig.json", "fix type errors", "improve async patterns", or encounters TS errors (TS2322, TS2339, "is not assignable to"). Also triggers on .ts, .tsx, .d.ts file work involving type definitions, module organization, or memory management. Does NOT cover TypeScript basics, framework-specific patterns, or testing.
---

# TypeScript Best Practices

Comprehensive performance optimization guide for TypeScript applications. Contains 42 rules across 8 categories, prioritized by impact to guide automated refactoring and code generation.

## When to Apply

Reference these guidelines when:
- Configuring tsconfig.json for a new or existing project
- Writing complex type definitions or generics
- Optimizing async/await patterns and data fetching
- Organizing modules and managing imports
- Reviewing code for compilation or runtime performance

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Type System Performance | CRITICAL | `type-` |
| 2 | Compiler Configuration | CRITICAL | `tscfg-` |
| 3 | Async Patterns | HIGH | `async-` |
| 4 | Module Organization | HIGH | `module-` |
| 5 | Type Safety Patterns | MEDIUM-HIGH | `safety-` |
| 6 | Memory Management | MEDIUM | `mem-` |
| 7 | Runtime Optimization | LOW-MEDIUM | `runtime-` |
| 8 | Advanced Patterns | LOW | `advanced-` |

## Table of Contents

1. [Type System Performance](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/_sections.md#1-type-system-performance) - **CRITICAL**
   - 1.1 [Add Explicit Return Types to Exported Functions](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/type-explicit-return-types.md) - CRITICAL (30-50% faster declaration emit)
   - 1.2 [Avoid Deeply Nested Generic Types](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/type-avoid-deep-generics.md) - CRITICAL (prevents exponential instantiation cost)
   - 1.3 [Avoid Large Union Types](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/type-avoid-large-unions.md) - CRITICAL (quadratic O(n2) comparison cost)
   - 1.4 [Extract Conditional Types to Named Aliases](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/type-extract-conditional-types.md) - CRITICAL (enables compiler caching, prevents re-evaluation)
   - 1.5 [Limit Type Recursion Depth](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/type-limit-recursion-depth.md) - CRITICAL (prevents exponential type expansion)
   - 1.6 [Prefer Interfaces Over Type Intersections](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/type-interfaces-over-intersections.md) - CRITICAL (2-5x faster type resolution)
   - 1.7 [Simplify Complex Mapped Types](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/type-simplify-mapped-types.md) - CRITICAL (reduces type computation by 50-80%)
2. [Compiler Configuration](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/_sections.md#2-compiler-configuration) - **CRITICAL**
   - 2.1 [Configure Include and Exclude Properly](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/tscfg-exclude-properly.md) - CRITICAL (prevents scanning thousands of unnecessary files)
   - 2.2 [Enable Incremental Compilation](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/tscfg-enable-incremental.md) - CRITICAL (50-90% faster rebuilds)
   - 2.3 [Enable skipLibCheck for Faster Builds](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/tscfg-skip-lib-check.md) - CRITICAL (20-40% faster compilation)
   - 2.4 [Enable strictFunctionTypes for Faster Variance Checks](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/tscfg-strict-function-types.md) - CRITICAL (enables optimized variance checking)
   - 2.5 [Use isolatedModules for Single-File Transpilation](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/tscfg-isolate-modules.md) - CRITICAL (80-90% faster transpilation with bundlers)
   - 2.6 [Use Project References for Large Codebases](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/tscfg-project-references.md) - CRITICAL (60-80% faster incremental builds)
3. [Async Patterns](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/_sections.md#3-async-patterns) - **HIGH**
   - 3.1 [Annotate Async Function Return Types](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/async-explicit-return-types.md) - HIGH (prevents runtime errors, improves inference)
   - 3.2 [Avoid await Inside Loops](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/async-avoid-loop-await.md) - HIGH (Nx faster for N iterations, 10 users = 10x improvement)
   - 3.3 [Avoid Unnecessary async/await](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/async-avoid-unnecessary-async.md) - HIGH (eliminates microtask queue overhead)
   - 3.4 [Defer await Until Value Is Needed](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/async-defer-await.md) - HIGH (enables implicit parallelization)
   - 3.5 [Use Promise.all for Independent Operations](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/async-parallel-promises.md) - HIGH (2-10x improvement in I/O-bound code)
4. [Module Organization](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/_sections.md#4-module-organization) - **HIGH**
   - 4.1 [Avoid Barrel File Imports](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/module-avoid-barrel-imports.md) - HIGH (200-800ms import cost, 30-50% larger bundles)
   - 4.2 [Avoid Circular Dependencies](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/module-avoid-circular-dependencies.md) - HIGH (prevents runtime undefined errors and slow compilation)
   - 4.3 [Control @types Package Inclusion](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/module-control-types-inclusion.md) - HIGH (prevents type conflicts and reduces memory usage)
   - 4.4 [Use Dynamic Imports for Large Modules](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/module-dynamic-imports.md) - HIGH (reduces initial bundle by 30-70%)
   - 4.5 [Use Type-Only Imports for Types](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/module-use-type-imports.md) - HIGH (eliminates runtime imports for type information)
5. [Type Safety Patterns](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/_sections.md#5-type-safety-patterns) - **MEDIUM-HIGH**
   - 5.1 [Enable strictNullChecks](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/safety-strict-null-checks.md) - MEDIUM-HIGH (prevents null/undefined runtime errors)
   - 5.2 [Prefer unknown Over any](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/safety-prefer-unknown-over-any.md) - MEDIUM-HIGH (forces type narrowing, prevents runtime errors)
   - 5.3 [Use Assertion Functions for Validation](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/safety-assertion-functions.md) - MEDIUM-HIGH (reduces validation boilerplate by 50-70%)
   - 5.4 [Use const Assertions for Literal Types](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/safety-const-assertions.md) - MEDIUM-HIGH (preserves literal types, enables better inference)
   - 5.5 [Use Exhaustive Checks for Union Types](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/safety-exhaustive-checks.md) - MEDIUM-HIGH (prevents 100% of missing case errors at compile time)
   - 5.6 [Use Type Guards for Runtime Type Checking](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/safety-use-type-guards.md) - MEDIUM-HIGH (eliminates type assertions, catches errors at boundaries)
6. [Memory Management](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/_sections.md#6-memory-management) - **MEDIUM**
   - 6.1 [Avoid Closure Memory Leaks](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/mem-avoid-closure-leaks.md) - MEDIUM (prevents retained references in long-lived callbacks)
   - 6.2 [Avoid Global State Accumulation](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/mem-avoid-global-state.md) - MEDIUM (prevents unbounded memory growth)
   - 6.3 [Clean Up Event Listeners](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/mem-cleanup-event-listeners.md) - MEDIUM (prevents unbounded memory growth)
   - 6.4 [Clear Timers and Intervals](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/mem-clear-timers.md) - MEDIUM (prevents callback retention and repeated execution)
   - 6.5 [Use WeakMap for Object Metadata](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/mem-use-weakmap-for-metadata.md) - MEDIUM (prevents memory leaks, enables automatic cleanup)
7. [Runtime Optimization](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/_sections.md#7-runtime-optimization) - **LOW-MEDIUM**
   - 7.1 [Avoid Object Spread in Hot Loops](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/runtime-avoid-object-spread-in-loops.md) - LOW-MEDIUM (reduces object allocations by Nx)
   - 7.2 [Cache Property Access in Loops](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/runtime-cache-property-access.md) - LOW-MEDIUM (reduces property lookups by Nx)
   - 7.3 [Prefer Native Array Methods Over Lodash](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/runtime-prefer-array-methods.md) - LOW-MEDIUM (eliminates library overhead, enables tree-shaking)
   - 7.4 [Use for-of for Simple Iteration](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/runtime-use-for-of-for-iteration.md) - LOW-MEDIUM (reduces iteration boilerplate by 30-50%)
   - 7.5 [Use Modern String Methods](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/runtime-use-string-methods.md) - LOW-MEDIUM (2-5x faster than regex for simple patterns)
   - 7.6 [Use Set/Map for O(1) Lookups](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/runtime-use-set-for-lookups.md) - LOW-MEDIUM (O(n) to O(1) per lookup)
8. [Advanced Patterns](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/_sections.md#8-advanced-patterns) - **LOW**
   - 8.1 [Use Branded Types for Type-Safe IDs](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/advanced-branded-types.md) - LOW (prevents mixing incompatible ID types)
   - 8.2 [Use satisfies for Type Validation with Inference](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/advanced-satisfies-operator.md) - LOW (prevents property access errors, enables 100% autocomplete accuracy)
   - 8.3 [Use Template Literal Types for String Patterns](https://github.com/pproenca/dot-skills/blob/master/skills/.curated/typescript/references/advanced-template-literal-types.md) - LOW (prevents 100% of string format errors at compile time)

## References

1. https://github.com/microsoft/TypeScript/wiki/Performance
2. https://www.typescriptlang.org/docs/handbook/
3. https://v8.dev/blog
4. https://nodejs.org/en/learn/diagnostics/memory
