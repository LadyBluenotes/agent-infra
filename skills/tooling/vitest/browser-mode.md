---
name: skills/tooling/vitest/browser-mode
description: >
  Vitest Browser Mode guidance for real-browser component tests, providers,
  `vitest/browser` APIs, CI setup, and choosing browser tests versus DOM environments.
type: skill
category: tooling
library: vitest
depth: primary
aliases:
  - vitest-browser
tags:
  - vitest
  - browser mode
  - component testing
  - playwright
references:
  - skills/tooling/vitest/ref/component-testing
  - skills/tooling/vitest/ref/visual-regression
  - skills/tooling/vitest/ref/projects
  - skills/tooling/vitest/ref/mocking
sources:
  - https://vitest.dev/guide/browser/
  - https://vitest.dev/guide/browser/component-testing.html
  - https://vitest.dev/guide/browser/visual-regression-testing.html
---

# Vitest Browser Mode

## Setup

Use Browser Mode when behavior depends on a real browser, real events, layout-adjacent APIs, or component interactions that DOM emulation cannot prove.

```ts
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
})
```

## Core Patterns

### Prefer Playwright for CI-capable browser tests

```sh
pnpm add -D vitest @vitest/browser-playwright
```

Vitest requires a Browser Mode provider. The preview provider is useful for local preview, but CI needs Playwright or WebdriverIO.

### Use projects to keep browser tests separate

```ts
export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['tests/**/*.unit.test.ts'],
          environment: 'node',
        },
      },
      {
        test: {
          name: 'browser',
          include: ['tests/**/*.browser.test.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
})
```

Separate projects keep fast unit tests, browser tests, and visual tests independently runnable and reportable.

### Use `vitest/browser` interactions

```ts
import { expect, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'

test('updates the name', async () => {
  await userEvent.fill(page.getByLabelText(/name/i), 'Ada')
  await expect.element(page.getByText('Ada')).toBeInTheDocument()
})
```

Use Browser Mode locators, `expect.element`, and `userEvent` so interactions go through the configured browser provider.

### Put deeper browser topics in refs

- Component render wrappers and MSW: @skills/tooling/vitest/ref/component-testing.md
- Visual screenshots and baselines: @skills/tooling/vitest/ref/visual-regression.md
- Browser/node splits: @skills/tooling/vitest/ref/projects.md
- Browser Mode mocking limits: @skills/tooling/vitest/ref/mocking.md

## Common Mistakes

### HIGH Treating `jsdom` as real browser coverage

```ts
// Wrong for browser-only behavior
test: { environment: 'jsdom' }
```

```ts
// Correct
test: {
  browser: {
    enabled: true,
    provider: playwright(),
    instances: [{ browser: 'chromium' }],
  },
}
```

Use Browser Mode when the claim depends on real browser execution.

### HIGH Using Testing Library `user-event` directly in Browser Mode

```ts
// Wrong
import userEvent from '@testing-library/user-event'
```

```ts
// Correct
import { userEvent } from 'vitest/browser'
```

Vitest recommends `vitest/browser` user events because they use the configured browser provider instead of simulating events in userland.

### MEDIUM Passing `--browser` without browser config

```sh
# Wrong when config lacks browser options
vitest --browser=chromium
```

```ts
// Correct
browser: {
  enabled: true,
  provider: playwright(),
  instances: [{ browser: 'chromium' }],
}
```

Vitest fails when Browser Mode is requested without explicit browser configuration.
