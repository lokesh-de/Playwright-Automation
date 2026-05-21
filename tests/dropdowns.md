````md id="n7k4px"
# Playwright Dropdown Examples (TypeScript)

## 1. Introduction

Dropdowns are commonly used in web applications for selecting values.

Types of dropdowns:
- Single Select Dropdown
- Multi Select Dropdown
- Custom Dropdown
- Random Selection
- Deselect Options

In Playwright, dropdowns are mainly handled using:

```ts
locator.selectOption()
```

---

# 2. Single Select Dropdown

HTML Example:

```html
<select id="country">
  <option value="india">India</option>
  <option value="usa">USA</option>
  <option value="uk">UK</option>
</select>
```

---

## Select by Value

```ts
import { test, expect } from '@playwright/test';

test('select dropdown by value', async ({ page }) => {
  await page.goto('https://example.com');

  await page.locator('#country')
    .selectOption('india');

  await expect(
    page.locator('#country')
  ).toHaveValue('india');
});
```

---

## Select by Label

```ts
await page.locator('#country')
  .selectOption({ label: 'India' });
```

---

## Select by Index

```ts
await page.locator('#country')
  .selectOption({ index: 1 });
```

---

# 3. Multi Select Dropdown

HTML Example:

```html
<select id="skills" multiple>
  <option value="java">Java</option>
  <option value="python">Python</option>
  <option value="playwright">Playwright</option>
</select>
```

---

## Select Multiple Values

```ts
import { test } from '@playwright/test';

test('multi select dropdown', async ({ page }) => {
  await page.goto('https://example.com');

  await page.locator('#skills')
    .selectOption([
      'java',
      'playwright'
    ]);
});
```

---

## Select Multiple Using Labels

```ts
await page.locator('#skills')
  .selectOption([
    { label: 'Java' },
    { label: 'Python' }
  ]);
```

---

# 4. Deselect Dropdown Options

Playwright does not have direct `deselect()` methods.

You can clear selection using:

```ts
selectOption([])
```

---

## Deselect All Options

```ts
import { test } from '@playwright/test';

test('deselect all options', async ({ page }) => {
  await page.goto('https://example.com');

  // Select options
  await page.locator('#skills')
    .selectOption([
      'java',
      'python'
    ]);

  // Deselect all
  await page.locator('#skills')
    .selectOption([]);
});
```

---

# 5. Random Dropdown Selection

Useful for:
- data-driven testing
- random test coverage

---

## Random Single Selection

```ts
import { test } from '@playwright/test';

test('random dropdown selection', async ({ page }) => {
  await page.goto('https://example.com');

  const dropdown = page.locator('#country');

  // Get all option values
  const options = await dropdown.locator('option')
    .allTextContents();

  // Remove first placeholder option if needed
  options.shift();

  // Random selection
  const randomOption =
    options[Math.floor(Math.random() * options.length)];

  await dropdown.selectOption({ label: randomOption });

  console.log('Selected:', randomOption);
});
```

---

# 6. Custom Dropdown Handling

Some applications use custom dropdowns instead of `<select>`.

Examples:
- React Select
- Bootstrap Dropdown
- Material UI Select

---

## Example

```ts
import { test } from '@playwright/test';

test('custom dropdown example', async ({ page }) => {
  await page.goto('https://example.com');

  // Open dropdown
  await page.locator('#custom-dropdown')
    .click();

  // Select option
  await page.locator('text="India"')
    .click();
});
```

---

# 7. Auto Suggest Dropdown

Used in:
- Google search
- search suggestions
- dynamic filters

---

## Example

```ts
import { test } from '@playwright/test';

test('auto suggest dropdown', async ({ page }) => {
  await page.goto('https://example.com');

  // Enter search text
  await page.locator('#search')
    .fill('Playwright');

  // Wait for suggestions
  await page.waitForSelector('.suggestion-item');

  // Click suggestion
  await page.locator(
    '.suggestion-item'
  ).first().click();
});
```

---

# 8. Get All Dropdown Options

Useful for validations.

---

## Example

```ts
import { test } from '@playwright/test';

test('get all dropdown options', async ({ page }) => {
  await page.goto('https://example.com');

  const options = await page
    .locator('#country option')
    .allTextContents();

  console.log(options);
});
```

---

# 9. Verify Selected Option

## Example

```ts
await expect(
  page.locator('#country')
).toHaveValue('india');
```

---

## Verify Multiple Selected Options

```ts
const values = await page.locator('#skills')
  .evaluate((select: HTMLSelectElement) =>
    Array.from(select.selectedOptions)
      .map(option => option.value)
  );

console.log(values);
```

---

# 10. Reusable Utility Functions

## Select Dropdown Option

```ts
export async function selectDropdown(
  page,
  selector: string,
  value: string
) {
  await page.locator(selector)
    .selectOption(value);
}
```

---

## Random Dropdown Selection Utility

```ts
export async function selectRandomOption(
  page,
  selector: string
) {
  const dropdown = page.locator(selector);

  const options = await dropdown
    .locator('option')
    .allTextContents();

  options.shift();

  const randomOption =
    options[Math.floor(Math.random() * options.length)];

  await dropdown.selectOption({
    label: randomOption
  });

  return randomOption;
}
```

---

# 11. Best Practices

## Prefer Value Selection

Recommended:

```ts
selectOption('india');
```

More stable than:

```ts
selectOption({ index: 1 });
```

---

## Use Stable Locators

Good:

```ts
page.getByLabel('Country');
page.getByTestId('country-dropdown');
```

Avoid:

```ts
div:nth-child(2) select
```

---

## Wait for Dropdown Visibility

```ts
await expect(
  page.locator('#country')
).toBeVisible();
```

---

# 12. Common Errors

## Error: Element is not a `<select>` element

Occurs when using:

```ts
selectOption()
```

on custom dropdowns.

Fix:
- Use click-based selection for custom dropdowns.

---

## Error: Option not found

Occurs when:
- value is incorrect
- option not loaded

Fix:

```ts
await page.waitForSelector('option');
```

---

# 13. Running Tests

Run all tests:

```bash
npx playwright test
```

Run single file:

```bash
npx playwright test tests/dropdown.spec.ts
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

# 14. References

- Playwright SelectOption  
  https://playwright.dev/docs/input#select-options

- Playwright Locators  
  https://playwright.dev/docs/locators

- Playwright Assertions  
  https://playwright.dev/docs/test-assertions

---

# Summary

This guide covered:

- Single select dropdown
- Multi select dropdown
- Deselect options
- Random selection
- Custom dropdowns
- Auto suggest dropdowns
- Dropdown assertions
- Utility functions
- Best practices
- Common errors

Playwright provides simple and powerful APIs to automate dropdown interactions reliably.
````
