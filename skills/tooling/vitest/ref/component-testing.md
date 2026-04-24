---
name: skills/tooling/vitest/ref/component-testing
description: >
  Vitest Browser Mode component-testing reference for render wrappers,
  locators, `expect.element`, provider-backed user events, and MSW setup.
type: reference
category: tooling
library: vitest
depth: reference
tags:
  - vitest
  - component testing
  - browser mode
  - msw
sources:
  - https://vitest.dev/guide/browser/component-testing.html
  - https://vitest.dev/guide/browser/
---

# Vitest Component Testing Reference

## Setup

```ts
import { render } from '@testing-library/react'
import { expect, test } from 'vitest'
import { page } from 'vitest/browser'

test('submits the form', async () => {
  render(<ProfileForm />)

  await page.getByLabelText(/name/i).fill('Ada')
  await page.getByRole('button', { name: /save/i }).click()

  await expect.element(page.getByText(/saved/i)).toBeInTheDocument()
})
```

## Core Patterns

### Use framework render helpers with Browser Mode locators

```ts
const { baseElement } = render(() => <App />)
const screen = page.elementLocator(baseElement)

await expect.element(screen.getByText('Ready')).toBeInTheDocument()
```

Use the framework's render helper to mount components, then use `vitest/browser` locators for interaction and assertions.

### Prefer user-visible queries

```ts
await page.getByRole('checkbox', { name: /electronics/i }).click()
await expect.element(page.getByText('Showing Electronics products')).toBeInTheDocument()
```

Role, label, and text queries keep component tests aligned with user-observable behavior.

### Mock requests with MSW in the browser

```ts
worker.use(
  http.get('/api/users/:id', () => {
    return HttpResponse.json({ error: 'User not found' }, { status: 404 })
  }),
)
```

Use request-level mocks for component network states instead of mocking component internals.

## Common Mistakes

### HIGH Testing component internals instead of user flow

```ts
// Wrong
expect(component.state.saved).toBe(true)
```

```ts
// Correct
await expect.element(page.getByText(/saved/i)).toBeInTheDocument()
```

Browser component tests should prove user-visible behavior and cross-component communication.

### MEDIUM Skipping async element assertions

```ts
// Wrong
expect(page.getByText('Loaded')).toBeTruthy()
```

```ts
// Correct
await expect.element(page.getByText('Loaded')).toBeInTheDocument()
```

`expect.element` retries, which matches async component rendering and request state changes.
