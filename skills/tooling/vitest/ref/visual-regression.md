---
name: skills/tooling/vitest/ref/visual-regression
description: >
  Vitest visual-regression reference for Browser Mode screenshots,
  baseline updates, thresholds, masking dynamic content, viewport stability, and CI separation.
type: reference
category: tooling
library: vitest
depth: reference
tags:
  - vitest
  - visual regression
  - screenshots
  - browser mode
sources:
  - https://vitest.dev/guide/browser/visual-regression-testing.html
---

# Vitest Visual Regression Reference

## Setup

```ts
import { expect, test } from 'vitest'
import { page } from 'vitest/browser'

test('product card visual state', async () => {
  await page.viewport(1280, 720)
  await expect(page.getByTestId('product-card')).toMatchScreenshot('product-card')
})
```

## Core Patterns

### Capture the smallest stable element

```ts
await expect(page.getByTestId('product-card')).toMatchScreenshot()
```

Prefer component or region screenshots over whole-page screenshots unless the page layout itself is the contract.

### Isolate visual tests from ordinary unit tests

```json
{
  "scripts": {
    "test:unit": "vitest --exclude tests/visual/*.test.ts",
    "test:visual": "vitest tests/visual/*.test.ts"
  }
}
```

Visual baselines are environment-sensitive, so keep them separately runnable and usually CI-owned.

### Control viewport and dynamic content

```ts
await page.viewport(1280, 720)

await expect(page.getByTestId('profile')).toMatchScreenshot({
  screenshotOptions: {
    mask: [page.getByTestId('last-seen')],
  },
})
```

Set viewport dimensions and mask timestamps, random values, or user-specific content.

### Review baseline updates

```sh
vitest --update
```

Commit reference screenshots only after checking that updated images match an intentional UI change.

## Common Mistakes

### HIGH Updating screenshots without review

```sh
# Wrong as an automatic PR step
vitest --update
```

```text
Correct: run update only for intentional UI changes, then review reference, actual, and diff images.
```

Screenshot updates are test data changes and can hide regressions if accepted blindly.

### MEDIUM Capturing the whole page for component claims

```ts
// Wrong
await expect(page).toMatchScreenshot()
```

```ts
// Correct
await expect(page.getByTestId('product-card')).toMatchScreenshot()
```

Whole-page screenshots fail on unrelated layout, font, and viewport differences.
