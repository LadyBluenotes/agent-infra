---
name: Overview
description: Router for JavaScript skill modules.
resources: []
---

# Overview

## Apply When
- Writing or reviewing JavaScript (browser or Node).
- Working in mixed JS/TS repos where runtime behavior matters.

## Do
- Pick the smallest module that matches the task:
  - Async and concurrency: @skills/code/javascript/async.md
  - Modules and imports: @skills/code/javascript/modules.md
  - Data transforms and immutability: @skills/code/javascript/data.md
  - Errors and boundaries: @skills/code/javascript/errors.md
  - Runtime and scheduling: @skills/code/javascript/runtime.md
  - Browser APIs: @skills/code/javascript/browser.md
  - Node.js APIs: @skills/code/javascript/node.md
  - Testing patterns: @skills/code/javascript/testing.md
  - Security footguns: @skills/code/javascript/security.md

## Playbooks
- Async: @skills/code/javascript/async.md (parallel requests, cancellation, error boundaries)
- Modules: @skills/code/javascript/modules.md (exports, imports, dynamic loading)
- Data: @skills/code/javascript/data.md (transforms, immutability, safe defaults)
- Errors: @skills/code/javascript/errors.md (error types, causes, safe handling)
- Runtime: @skills/code/javascript/runtime.md (scheduling, timers, hot-path concerns)
- Browser: @skills/code/javascript/browser.md (DOM and browser-only APIs)
- Node: @skills/code/javascript/node.md (fs, process, server-side patterns)
- Testing: @skills/code/javascript/testing.md (async-safe test structure)
- Security: @skills/code/javascript/security.md (common JS footguns)

## Don't
- Don't apply JS guidance to purely type-level TypeScript work.

## Output
- Call out runtime assumptions (browser vs Node).
