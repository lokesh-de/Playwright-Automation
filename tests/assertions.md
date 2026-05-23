````md id="j8w2ms"
# Playwright Assertions Examples (TypeScript)

## 1. Introduction

Assertions are used to verify:
- element states
- text values
- visibility
- URLs
- page titles
- attributes
- input values

Playwright provides built-in assertions using:

```ts
expect()
```

Assertions automatically:
- wait for conditions
- retry until timeout
- reduce flaky tests

---

## 2. Import Assertions

```ts
import { test, expect } from '@playwright/test';
```

---

## 3. Basic Assertion Syntax

```ts
await expect(locator).toBeVisible();
```

---

## 4. Visibility Assertions

---

## `toBeVisible()`

Checks whether element is visible.

```ts
test('element visibility', async ({ page }) => {
  await page.goto('https://example.com');

  await expect(
    page.locator('#login-button')
  ).toBeVisible();
});
```

---

## `toBeHidden()`

Checks whether element is hidden.

```ts
await expect(
  page.locator('.loading-spinner')
).toBeHidden();
```

---

## 5. Text Assertions

---

## `toHaveText()`

Checks exact text.

```ts
await expect(
  page.locator('.title')
).toHaveText('Dashboard');
```

---

## Partial Text Match

```ts
await expect(
  page.locator('.message')
).toContainText('Success');
```

---

## Multiple Text Assertions

```ts
await expect(
  page.locator('.menu-item')
).toHaveText([
  'Home',
  'About',
  'Contact'
]);
```

---

## 6. Input Assertions

---

## `toHaveValue()`

Checks input value.

```ts
await expect(
  page.locator('#username')
).toHaveValue('admin');
```

---

## Empty Input

```ts
await expect(
  page.locator('#search')
).toBeEmpty();
```

---

## 7. Attribute Assertions

---

## `toHaveAttribute()`

Checks HTML attributes.

```ts
await expect(
  page.locator('#email')
).toHaveAttribute(
  'type',
  'email'
);
```

---

## Example

```html
<input id="email" type="email" />
```

---

## 8. Checkbox Assertions

---

## `toBeChecked()`

Checks checkbox or radio button.

```ts
await expect(
  page.locator('#remember-me')
).toBeChecked();
```

---

## `not.toBeChecked()`

```ts
await expect(
  page.locator('#subscribe')
).not.toBeChecked();
```

---

## 9. Enable/Disable Assertions

---

## `toBeEnabled()`

```ts
await expect(
  page.locator('#submit')
).toBeEnabled();
```

---

## `toBeDisabled()`

```ts
await expect(
  page.locator('#submit')
).toBeDisabled();
```

---

## 10. Editable Assertions

---

## `toBeEditable()`

```ts
await expect(
  page.locator('#username')
).toBeEditable();
```

---

## `toBeReadOnly()`

```ts
await expect(
  page.locator('#email')
).toBeReadOnly();
```

---

## 11. Element Count Assertions

---

## `toHaveCount()`

Checks number of matching elements.

```ts
await expect(
  page.locator('.product-card')
).toHaveCount(5);
```

---

## 12. CSS Assertions

---

## `toHaveCSS()`

Checks CSS property values.

```ts
await expect(
  page.locator('.title')
).toHaveCSS(
  'color',
  'rgb(255, 0, 0)'
);
```

---

## 13. Class Assertions

---

## `toHaveClass()`

```ts
await expect(
  page.locator('.alert')
).toHaveClass('alert success');
```

---

## Partial Class Match

```ts
await expect(
  page.locator('.alert')
).toContainClass('success');
```

---

## 14. URL Assertions

---

## `toHaveURL()`

Checks current page URL.

```ts
await expect(page)
  .toHaveURL('https://example.com/dashboard');
```

---

## Partial URL Match

```ts
await expect(page)
  .toHaveURL(/dashboard/);
```

---

## 15. Title Assertions

---

## `toHaveTitle()`

Checks page title.

```ts
await expect(page)
  .toHaveTitle('Dashboard');
```

---

## Partial Title Match

```ts
await expect(page)
  .toHaveTitle(/Dashboard/);
```

---

## 16. Negative Assertions

Use `not`.

---

## Example

```ts
await expect(
  page.locator('#error')
).not.toBeVisible();
```

---

## Another Example

```ts
await expect(page)
  .not.toHaveURL(/login/);
```

---

## 17. Soft Assertions

Soft assertions continue test execution even if assertion fails.

---

## Example

```ts
await expect.soft(
  page.locator('.title')
).toHaveText('Dashboard');
```

---

## 18. Generic Value Assertions

Used for:
- numbers
- arrays
- objects
- strings

---

## Equal Assertion

```ts
expect(10).toBe(10);
```

---

## Deep Equality

```ts
expect({
  name: 'Playwright'
}).toEqual({
  name: 'Playwright'
});
```

---

## Contains

```ts
expect([1, 2, 3])
  .toContain(2);
```

---

## 19. API Response Assertions

Useful in API testing.

---

## Example

```ts
const response = await page.request.get(
  'https://reqres.in/api/users/2'
);

expect(response.status()).toBe(200);
```

---

## 20. Assertions with Auto Waiting

Playwright automatically waits until:
- assertion passes
- timeout occurs

---

## Example

```ts
await expect(
  page.locator('.success-message')
).toBeVisible();
```

No manual wait needed.

---

## 21. Custom Timeout for Assertions

---

## Example

```ts
await expect(
  page.locator('.message')
).toBeVisible({
  timeout: 10000
});
```

---

## 22. Reusable Assertion Utility

---

## Example

```ts
export async function verifyText(
  locator,
  expectedText: string
) {
  await expect(locator)
    .toHaveText(expectedText);
}
```

---

## Usage

```ts
await verifyText(
  page.locator('.title'),
  'Dashboard'
);
```

---

## 23. Best Practices

---

## Prefer Built-in Assertions

Recommended:

```ts
await expect(locator).toBeVisible();
```

Avoid manual checks:

```ts
const visible = await locator.isVisible();
expect(visible).toBe(true);
```

---

## Use Auto Waiting

Avoid:

```ts
await page.waitForTimeout(5000);
```

Prefer:

```ts
await expect(locator).toBeVisible();
```

---

## Keep Assertions Specific

Good:

```ts
await expect(locator)
  .toHaveText('Login Successful');
```

Avoid vague assertions.

---

## 24. Common Errors

---

## Error: Timeout exceeded

Occurs when:
- condition not met
- locator incorrect

Fix:
- verify selector
- increase timeout
- ensure element exists

---

## Error: Strict mode violation

Occurs when:
- multiple elements match locator

Fix:

```ts
locator.first();
locator.nth(0);
```

---

## 25. Running Tests

Run all tests:

```bash
npx playwright test
```

Run single file:

```bash
npx playwright test tests/assertions.spec.ts
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

## 26. References

- Playwright Assertions  
  https://playwright.dev/docs/test-assertions

- Playwright Locators  
  https://playwright.dev/docs/locators

- Playwright API Testing  
  https://playwright.dev/docs/api-testing

---

## Summary

This guide covered:

- Visibility assertions
- Text assertions
- Value assertions
- Attribute assertions
- URL assertions
- Title assertions
- CSS assertions
- Checkbox assertions
- Soft assertions
- API assertions
- Auto waiting
- Best practices
- Common errors

Playwright assertions provide reliable and auto-waiting validation mechanisms for stable automation testing.
````