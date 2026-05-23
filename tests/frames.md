# Playwright Frames and iFrames Examples (TypeScript)

## 1. Introduction

Frames and iFrames are used to embed another HTML document inside a webpage.

In Playwright, you can interact with frames using:
- `frameLocator()`
- `contentFrame()`
- `page.frame()`

---

## 2. Handling iFrame Using `frameLocator()`

Recommended and easiest approach.

```ts
import { test, expect } from '@playwright/test';

test('handle iframe using frameLocator', async ({ page }) => {
  await page.goto('https://example.com');

  // Access iframe
  const frame = page.frameLocator('#sample-iframe');

  // Interact inside iframe
  await frame.locator('#username').fill('admin');
  await frame.locator('#password').fill('password');

  await frame.locator('#login').click();

  // Assertion
  await expect(
    frame.locator('.success-message')
  ).toBeVisible();
});
```

---

## 3. Handling iFrame Using `contentFrame()`

Useful when you already have iframe locator.

```ts
import { test, expect } from '@playwright/test';

test('handle iframe using contentFrame', async ({ page }) => {
  await page.goto('https://example.com');

  // Locate iframe element
  const iframeElement = page.locator('#sample-iframe');

  // Convert to frame
  const frame = await iframeElement.contentFrame();

  // Interact inside frame
  await frame?.locator('#email')
    .fill('test@example.com');

  await frame?.locator('#submit')
    .click();

  // Assertion
  await expect(
    frame?.locator('.message')
  ).toBeVisible();
});
```

---

## 4. Handling Frame Using `page.frame()`

Useful when frame has:
- name
- url

```ts
import { test } from '@playwright/test';

test('handle frame using page.frame()', async ({ page }) => {
  await page.goto('https://example.com');

  // Get frame by name
  const frame = page.frame({
    name: 'login-frame'
  });

  await frame?.locator('#username')
    .fill('admin');

  await frame?.locator('#password')
    .fill('password');

  await frame?.locator('#login')
    .click();
});
```

---

## 5. Nested iFrames

Handle iframe inside another iframe.

```ts
import { test } from '@playwright/test';

test('handle nested iframe', async ({ page }) => {
  await page.goto('https://example.com');

  // Parent frame
  const parentFrame = page
    .frameLocator('#parent-frame');

  // Child frame
  const childFrame = parentFrame
    .frameLocator('#child-frame');

  // Action inside child frame
  await childFrame.locator('#search')
    .fill('Playwright');

  await childFrame.locator('#submit')
    .click();
});
```

---

## 6. Switching Between Main Page and iFrame

```ts
import { test } from '@playwright/test';

test('switch between main page and iframe', async ({ page }) => {
  await page.goto('https://example.com');

  // Main page action
  await page.locator('#open-frame')
    .click();

  // iFrame action
  const frame = page.frameLocator('#sample-frame');

  await frame.locator('#input')
    .fill('Inside iframe');

  // Back to main page
  await page.locator('#submit-main')
    .click();
});
```

---

## 7. Handling Dynamic iFrames

Wait for iframe before interacting.

```ts
import { test, expect } from '@playwright/test';

test('handle dynamic iframe', async ({ page }) => {
  await page.goto('https://example.com');

  // Wait for iframe
  await expect(
    page.locator('#dynamic-frame')
  ).toBeVisible();

  const frame = page.frameLocator('#dynamic-frame');

  await frame.locator('#message')
    .fill('Hello Frame');
});
```

---

## 8. Reusable Utility Function

```ts
export async function getFrame(
  page,
  frameSelector: string
) {
  return page.frameLocator(frameSelector);
}
```

### Usage

```ts
const frame = getFrame(page, '#login-frame');

await frame.locator('#username')
  .fill('admin');
```

---

## 9. Common Assertions

### Verify Element Inside iFrame

```ts
await expect(
  frame.locator('.success-message')
).toBeVisible();
```

### Verify Text Inside Frame

```ts
await expect(
  frame.locator('.title')
).toHaveText('Dashboard');
```

### Verify Input Value

```ts
await expect(
  frame.locator('#username')
).toHaveValue('admin');
```

---

## 10. Best Practices

### Prefer `frameLocator()`

Recommended:

```ts
page.frameLocator('#frame-id');
```

Avoid unnecessary manual frame handling.

---

### Use Stable Selectors

Good:

```ts
frame.locator('[data-testid="login"]');
frame.getByRole('button');
frame.getByLabel('Username');
```

Avoid:

```ts
div:nth-child(2) > iframe
```

---

### Wait for Frame Visibility

```ts
await expect(
  page.locator('#frame-id')
).toBeVisible();
```

---

## 11. Running Tests

Run all tests:

```bash
npx playwright test
```

Run single file:

```bash
npx playwright test tests/iframe.spec.ts
```

Run headed mode:

```bash
npx playwright test --headed
```

Run debug mode:

```bash
npx playwright test --debug
```

---

## 12. Common Errors

### Error: Frame not found

```ts
const frame = page.frame({
  name: 'frame-name'
});
```

Make sure:
- Frame exists
- Name is correct
- Frame is loaded

---

### Error: Cannot read properties of null

Occurs when:

```ts
const frame = await iframe.contentFrame();
```

returns `null`.

Fix:

```ts
await expect(iframe).toBeVisible();
```

before accessing frame.

---

## 13. References

- Playwright Frames  
  https://playwright.dev/docs/frames

- Playwright Locators  
  https://playwright.dev/docs/locators

- Playwright Assertions  
  https://playwright.dev/docs/test-assertions

---

## Summary

This guide covered:

- `frameLocator()`
- `contentFrame()`
- `page.frame()`
- Nested iFrames
- Dynamic frames
- Frame assertions
- Best practices
- Common errors

Playwright provides powerful APIs to reliably automate applications that use frames and iFrames.
````