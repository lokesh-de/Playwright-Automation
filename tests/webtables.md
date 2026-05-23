# Playwright Bootstrap Dropdowns, Pagination, and Web Tables (TypeScript)

## Table of Contents

1. Bootstrap Dropdowns
2. Pagination
3. Web Tables
4. Dynamic Tables
5. Utility Functions
6. Best Practices
7. Common Errors
8. References

---

## 1. Bootstrap Dropdowns

## Introduction

Bootstrap dropdowns are custom dropdown components.

Unlike HTML `<select>` elements:
- they use div/li/a elements
- `selectOption()` does NOT work

You must use:
- click actions
- text locators

---

## Bootstrap Dropdown HTML Example

```html
<div class="dropdown">
  <button id="dropdownMenuButton">
    Select Country
  </button>

  <ul class="dropdown-menu">
    <li><a>India</a></li>
    <li><a>USA</a></li>
    <li><a>UK</a></li>
  </ul>
</div>
```

---

## Select Bootstrap Dropdown Option

```ts
import { test } from '@playwright/test';

test('bootstrap dropdown example', async ({ page }) => {
  await page.goto('https://example.com');

  // Open dropdown
  await page.locator('#dropdownMenuButton')
    .click();

  // Select option
  await page.locator('text="India"')
    .click();
});
```

---

## Select Option Dynamically

```ts
const country = 'USA';

await page.locator('#dropdownMenuButton')
  .click();

await page.locator(`text="${country}"`)
  .click();
```

---

## Multi Select Bootstrap Dropdown

```ts
await page.locator('#multi-select')
  .click();

await page.locator('text="Java"')
  .click();

await page.locator('text="Playwright"')
  .click();
```

---

## Get All Dropdown Options

```ts
const options = await page
  .locator('.dropdown-menu li')
  .allTextContents();

console.log(options);
```

---

## 2. Pagination

## Introduction

Pagination is used to navigate across multiple pages of data.

Common pagination types:
- numbered pagination
- next/previous
- infinite scroll

---

## 3. Basic Pagination Example

---

## Click Next Page

```ts
import { test } from '@playwright/test';

test('pagination example', async ({ page }) => {
  await page.goto('https://example.com');

  await page.locator('text="Next"')
    .click();
});
```

---

## Click Specific Page Number

```ts
await page.locator('text="3"')
  .click();
```

---

## 4. Loop Through Pagination

---

## Example

```ts
import { test } from '@playwright/test';

test('iterate pagination', async ({ page }) => {
  await page.goto('https://example.com');

  while (true) {

    // Extract data
    const rows = await page
      .locator('table tbody tr')
      .allTextContents();

    console.log(rows);

    // Check if next button exists
    const nextButton = page.locator('text="Next"');

    if (await nextButton.isDisabled()) {
      break;
    }

    await nextButton.click();
  }
});
```

---

## 5. Infinite Scroll Pagination

---

## Example

```ts
import { test } from '@playwright/test';

test('infinite scroll example', async ({ page }) => {
  await page.goto('https://example.com');

  for (let i = 0; i < 5; i++) {
    await page.mouse.wheel(0, 2000);

    await page.waitForTimeout(2000);
  }
});
```

---

## 6. Web Tables

## Introduction

Web tables are used to display:
- user data
- reports
- dashboards
- records

Playwright can:
- read table data
- validate rows
- validate columns
- click table buttons

---

## 7. Static Web Table

---

## HTML Example

```html
<table id="employees">
  <thead>
    <tr>
      <th>Name</th>
      <th>Role</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>John</td>
      <td>QA</td>
    </tr>
  </tbody>
</table>
```

---

## Get All Rows

```ts
const rows = await page
  .locator('#employees tbody tr')
  .allTextContents();

console.log(rows);
```

---

## Count Rows

```ts
const rowCount = await page
  .locator('#employees tbody tr')
  .count();

console.log(rowCount);
```

---

## Count Columns

```ts
const columnCount = await page
  .locator('#employees thead th')
  .count();

console.log(columnCount);
```

---

## 8. Read Specific Row Data

---

## Example

```ts
const row = page
  .locator('#employees tbody tr')
  .nth(0);

console.log(await row.textContent());
```

---

## 9. Read Specific Cell Data

---

## Example

```ts
const cell = page
  .locator('#employees tbody tr')
  .nth(0)
  .locator('td')
  .nth(1);

console.log(await cell.textContent());
```

---

## 10. Dynamic Web Tables

Dynamic tables update automatically.

---

## Find Row by Text

```ts
const row = page.locator(
  'table tbody tr',
  {
    hasText: 'John'
  }
);

console.log(await row.textContent());
```

---

## Click Button Inside Row

```ts
await page.locator('tr', {
  hasText: 'John'
})
.locator('button')
.click();
```

---

## 11. Validate Table Data

---

## Verify Cell Text

```ts
import { expect } from '@playwright/test';

await expect(
  page.locator('table tbody tr')
    .nth(0)
    .locator('td')
    .nth(1)
).toHaveText('QA');
```

---

## Verify Row Count

```ts
await expect(
  page.locator('table tbody tr')
).toHaveCount(5);
```

---

## 12. Search Data in Table

---

## Example

```ts
const rows = page.locator('table tbody tr');

const count = await rows.count();

for (let i = 0; i < count; i++) {

  const rowText = await rows
    .nth(i)
    .textContent();

  if (rowText?.includes('John')) {

    console.log('Record Found');

    break;
  }
}
```

---

## 13. Handle Table Pagination

---

## Example

```ts
while (true) {

  const rows = await page
    .locator('table tbody tr')
    .allTextContents();

  console.log(rows);

  const next = page.locator('.next-page');

  if (await next.isDisabled()) {
    break;
  }

  await next.click();
}
```

---

## 14. Utility Functions

---

## Select Bootstrap Dropdown

```ts
export async function selectBootstrapDropdown(
  page,
  dropdownSelector: string,
  optionText: string
) {
  await page.locator(dropdownSelector)
    .click();

  await page.locator(`text="${optionText}"`)
    .click();
}
```

---

## Get Table Rows

```ts
export async function getTableRows(
  page,
  tableSelector: string
) {
  return await page
    .locator(`${tableSelector} tbody tr`)
    .allTextContents();
}
```

---

## 15. Best Practices

---

## Prefer Stable Selectors

Good:

```ts
page.getByTestId('table');
page.getByRole('button');
```

Avoid:

```ts
div:nth-child(3) table tr
```

---

## Avoid Hardcoded Waits

Avoid:

```ts
await page.waitForTimeout(5000);
```

Prefer:

```ts
await expect(locator)
  .toBeVisible();
```

---

## Validate Pagination State

Before clicking next:

```ts
await expect(nextButton)
  .toBeEnabled();
```

---

## 16. Common Errors

---

## Error: Option not found

Occurs when:
- dropdown not opened
- text mismatch

Fix:

```ts
await dropdown.click();
```

before selection.

---

## Error: Row count mismatch

Occurs when:
- table loads dynamically

Fix:
- wait for table loading completion

---

## Error: Next button disabled

Fix:
- check button state before clicking

---

## 17. Running Tests

Run all tests:

```bash
npx playwright test
```

Run single file:

```bash
npx playwright test tests/table.spec.ts
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

## 18. References

- Playwright Locators  
  https://playwright.dev/docs/locators

- Playwright Assertions  
  https://playwright.dev/docs/test-assertions

- Playwright Actions  
  https://playwright.dev/docs/input

---

## Summary

This guide covered:

- Bootstrap dropdowns
- Multi select dropdowns
- Pagination handling
- Infinite scrolling
- Static web tables
- Dynamic web tables
- Table validations
- Searching table data
- Table pagination
- Utility functions
- Best practices
- Common errors

Playwright provides powerful APIs for automating dropdowns, paginated pages, and web table interactions reliably.
````