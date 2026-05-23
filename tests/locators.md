````md id="m2k9df"
# Playwright Built-in Locators and CSS Locators (TypeScript)

## 1. Introduction

Locators are used to identify and interact with web elements in Playwright.

Playwright supports:
- Built-in locators
- CSS locators
- XPath locators
- Text locators
- Chained locators

Recommended:
- Use Playwright built-in locators whenever possible.
- Use CSS selectors only when necessary.

---

## 2. Playwright Built-in Locators

Playwright provides powerful built-in locators that are:
- reliable
- readable
- auto-waiting
- resilient

---

## 3. `getByRole()`

Recommended for:
- buttons
- links
- checkboxes
- inputs

Uses accessibility roles.

---

## Example

```ts
import { test } from '@playwright/test';

test('getByRole example', async ({ page }) => {
  await page.goto('https://example.com');

  await page.getByRole('button', {
    name: 'Login'
  }).click();
});
```

---

## Common Roles

| Role | Example |
|---|---|
| button | Login button |
| textbox | Input field |
| checkbox | Checkbox |
| radio | Radio button |
| link | Anchor link |
| heading | Page heading |

---

## 4. `getByText()`

Finds elements using visible text.

---

## Example

```ts
await page.getByText('Submit').click();
```

---

## Partial Text Match

```ts
await page.getByText('Welcome').click();
```

---

## Exact Match

```ts
await page.getByText('Submit', {
  exact: true
}).click();
```

---

## 5. `getByLabel()`

Used for form fields associated with labels.

---

## Example

```ts
await page.getByLabel('Username')
  .fill('admin');
```

---

## HTML Example

```html
<label for="username">Username</label>
<input id="username" />
```

---

## 6. `getByPlaceholder()`

Used for placeholder text.

---

## Example

```ts
await page.getByPlaceholder('Enter email')
  .fill('test@example.com');
```

---

## 7. `getByAltText()`

Used for images.

---

## Example

```ts
await page.getByAltText('Company Logo')
  .click();
```

---

## HTML Example

```html
<img alt="Company Logo" />
```

---

## 8. `getByTitle()`

Used for title attributes.

---

## Example

```ts
await page.getByTitle('Close')
  .click();
```

---

## HTML Example

```html
<button title="Close"></button>
```

---

## 9. `getByTestId()`

Best practice for automation testing.

---

## Example

```ts
await page.getByTestId('login-button')
  .click();
```

---

## HTML Example

```html
<button data-testid="login-button">
  Login
</button>
```

---

## 10. Basic CSS Locators

CSS locators directly target HTML elements.

---

## Locate by ID

```ts
await page.locator('#username')
  .fill('admin');
```

---

## Locate by Class

```ts
await page.locator('.login-btn')
  .click();
```

---

## Locate by Tag

```ts
await page.locator('input')
  .first()
  .fill('text');
```

---

## Locate by Attribute

```ts
await page.locator('[type="submit"]')
  .click();
```

---

## 11. Advanced CSS Locators

---

## Multiple Classes

```ts
await page.locator('.btn.primary')
  .click();
```

---

## Child Selector

```ts
await page.locator('div > button')
  .click();
```

---

## Descendant Selector

```ts
await page.locator('form button')
  .click();
```

---

## nth-child Selector

```ts
await page.locator('ul li:nth-child(2)')
  .click();
```

---

## First and Last Element

```ts
await page.locator('.item')
  .first()
  .click();

await page.locator('.item')
  .last()
  .click();
```

---

## 12. Text with CSS Locator

```ts
await page.locator('button:has-text("Login")')
  .click();
```

---

## 13. Chained Locators

Useful for narrowing scope.

---

## Example

```ts
await page.locator('.login-form')
  .locator('#username')
  .fill('admin');
```

---

## 14. Filter Locators

---

## Filter by Text

```ts
await page.locator('.card')
  .filter({ hasText: 'Playwright' })
  .click();
```

---

## Filter by Child Element

```ts
await page.locator('li')
  .filter({
    has: page.locator('button')
  });
```

---

## 15. XPath Locator

Playwright supports XPath.

---

## Example

```ts
await page.locator('//button[text()="Login"]')
  .click();
```

---

## Relative XPath

```ts
await page.locator(
  '//input[@id="username"]'
).fill('admin');
```

---

## 16. Locator Assertions

---

## Verify Visibility

```ts
await expect(
  page.getByText('Welcome')
).toBeVisible();
```

---

## Verify Text

```ts
await expect(
  page.locator('.title')
).toHaveText('Dashboard');
```

---

## Verify Attribute

```ts
await expect(
  page.locator('#email')
).toHaveAttribute(
  'type',
  'email'
);
```

---

## 17. Best Practices

---

## Prefer Built-in Locators

Recommended:

```ts
page.getByRole();
page.getByLabel();
page.getByTestId();
```

Avoid excessive CSS/XPath usage.

---

## Prefer `data-testid`

Stable selector:

```html
<button data-testid="submit-btn">
```

Usage:

```ts
page.getByTestId('submit-btn');
```

---

## Avoid Fragile Selectors

Avoid:

```ts
div:nth-child(3) > span > button
```

---

## Use Accessible Selectors

Good:

```ts
page.getByRole('button', {
  name: 'Submit'
});
```

---

## 18. Common Errors

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

## Error: Element not found

Fix:
- verify selector
- wait for element
- check iframe/shadow DOM

---

## 19. Running Tests

Run all tests:

```bash
npx playwright test
```

Run single file:

```bash
npx playwright test tests/locator.spec.ts
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

## 20. References

- Playwright Locators  
  https://playwright.dev/docs/locators

- Playwright Assertions  
  https://playwright.dev/docs/test-assertions

- Playwright Accessibility  
  https://playwright.dev/docs/accessibility-testing

---

## Summary

This guide covered:

- Built-in locators
- `getByRole()`
- `getByText()`
- `getByLabel()`
- `getByPlaceholder()`
- `getByTestId()`
- CSS locators
- XPath locators
- Chained locators
- Filter locators
- Assertions
- Best practices
- Common errors

Playwright locators provide reliable and maintainable ways to automate web applications effectively.
````