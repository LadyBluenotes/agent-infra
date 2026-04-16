---
name: skills/general/release-smoke
description: >
  Release smoke workflow for final package checks, script lifecycle awareness,
  pack previews, CI evidence, and publish-readiness notes without making registry claims.
type: sub-skill
category: general
depth: primary
aliases:
  - release smoke
  - publish smoke
  - package smoke
tags:
  - release
  - npm
  - package
  - verification
references:
  - skills/general/verification-before-completion
  - skills/review/pr-closeout
  - skills/tooling/package-manager-diagnostics
sources:
  - https://docs.npmjs.com/cli/v8/using-npm/scripts/
  - https://docs.npmjs.com/cli/v11/commands/npm-pack
  - https://docs.npmjs.com/cli/v10/commands/npm-publish/
  - https://docs.github.com/actions/writing-workflows/workflow-syntax-for-github-actions
---

# Release Smoke

## Setup

Use this before a package release, publish handoff, or release PR closeout. Never publish unless explicitly asked.

## Core Patterns

### Identify release surface

```text
Read:
- package.json
- lockfile
- changelog or release notes
- build output config
- CI workflow
```

State `Unknown` for package contents, registry target, or release version until files and commands prove them.

### Run the nearest proof commands

```sh
npm test
npm run build
npm run typecheck
npm run lint
```

Use the repo's actual package manager and scripts. Do not invent standard script names that are absent from `package.json`.

### Account for npm script lifecycle

```text
npm run <name> can invoke matching pre<name> and post<name> scripts.
```

Read scripts before claiming what a command does.

### Preview package contents

```sh
npm pack --dry-run
npm pack --json
```

Use pack output to inspect included files. Treat this as package-content evidence, not proof that publish credentials, registry permissions, or release automation will work.

### Compare CI shape to local smoke

```text
CI smoke:
- workflow trigger
- job runner
- working directory
- package manager setup
- install command
- test/build command
```

GitHub Actions `run` steps execute commands in a runner shell. Use workflow truth before claiming CI parity.

## Common Mistakes

### HIGH Publishing during smoke

```text
Wrong: run npm publish to test readiness.
Correct: run non-publishing checks unless the user explicitly asked to publish.
```

Smoke checks should be reversible.

### HIGH Assuming dry-run proves registry success

```text
Wrong: "npm pack passed, so publish will succeed."
Correct: "Package contents were previewed; registry publish was not verified."
```

Pack and publish are different operations.

### MEDIUM Skipping generated package contents

```text
Wrong: inspect source files only.
Correct: inspect the package tarball or dry-run file list.
```

Users install the packaged artifact, not the working tree.
