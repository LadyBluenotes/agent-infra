---
name: skills/tooling/vite/ref/environment-api
description: >
  Vite Environment API reference for environment instances, framework/runtime
  integration, and avoiding old SSR-only assumptions.
type: reference
category: tooling
library: vite
depth: reference
tags:
  - vite
  - environment api
  - ssr
sources:
  - https://vite.dev/guide/api-environment
---

# Vite Environment API Reference

## Setup

```text
Use this ref when framework or runtime integration depends on Vite environment instances.
```

## Core Patterns

### Separate app-level config from environment integration

```text
App config: aliases, plugins, server, build.
Environment integration: runtime-specific module loading and transform context.
```

Most app changes do not need Environment API details.

### Check current docs before using experimental APIs

```text
Unknown until checked: exact Environment API option shape for a target Vite version.
```

Environment integration evolves quickly; verify exact options before writing code.

## Common Mistakes

### HIGH Guessing Environment API shapes

```text
Wrong: invent `environment.ssr` options from older SSR mental models.
Correct: read the current Environment API page and the framework adapter source.
```

Use primary sources before touching framework/runtime integration.
