# Playwright Date Picker Examples (TypeScript)

## 1. Native HTML Date Input

If the application uses a native HTML date input (`input[type="date"]`),
you can directly use `fill()`.

```ts
import { test, expect } from '@playwright/test';

test('select date using native input', async ({ page }) => {
  await page.goto('https://example.com');

  // Fill date directly
  await page.locator('input[type="date"]').fill('2026-05-21');

  // Assertion
  await expect(page.locator('input[type="date"]'))
    .toHaveValue('2026-05-21');
});
```

---

## 2. Custom Calendar Date Picker

For UI libraries like:
- Material UI
- Ant Design
- Bootstrap
- React DatePicker

```ts
import { test, expect } from '@playwright/test';

test('select date from custom calendar', async ({ page }) => {
  await page.goto('https://example.com');

  // Open calendar
  await page.locator('#date-picker').click();

  // Select month
  await page.locator('.month-select').selectOption('May');

  // Select year
  await page.locator('.year-select').selectOption('2026');

  // Select day
  await page.locator('text="21"').click();

  // Verify selected value
  await expect(page.locator('#date-picker'))
    .toHaveValue('21/05/2026');
});
```

---

## 3. Material UI Date Picker

```ts
import { test } from '@playwright/test';

test('material ui date picker', async ({ page }) => {
  await page.goto('https://example.com');

  // Open picker
  await page.getByLabel('Choose date').click();

  // Navigate to next month
  await page.getByRole('button', {
    name: 'Next month'
  }).click();

  // Select date
  await page.getByRole('gridcell', {
    name: '21'
  }).click();
});
```

---

## 4. React Date Picker Example

```ts
import { test } from '@playwright/test';

test('react date picker example', async ({ page }) => {
  await page.goto('https://example.com');

  // Open picker
  await page.locator('#react-datepicker').click();

  // Select month
  await page.locator(
    '.react-datepicker__month-select'
  ).selectOption('5');

  // Select year
  await page.locator(
    '.react-datepicker__year-select'
  ).selectOption('2026');

  // Select day
  await page.locator(
    '.react-datepicker__day--021'
  ).click();
});
```

---

## 5. Dynamic Calendar Navigation

Useful when the target month is not visible.

```ts
import { test } from '@playwright/test';

test('navigate calendar dynamically', async ({ page }) => {
  await page.goto('https://example.com');

  await page.locator('#date-picker').click();

  const targetMonth = 'June';
  const targetYear = '2026';

  while (true) {
    const currentMonth = await page
      .locator('.calendar-month')
      .textContent();

    const currentYear = await page
      .locator('.calendar-year')
      .textContent();

    if (
      currentMonth?.includes(targetMonth) &&
      currentYear?.includes(targetYear)
    ) {
      break;
    }

    await page.locator('.next-month').click();
  }

  // Select date
  await page.locator('text="15"').click();
});
```

---

## 6. Reusable Utility Function

```ts
export async function selectDate(
  page,
  dateInput: string,
  year: string,
  month: string,
  day: string
) {
  await page.locator(dateInput).click();

  await page.locator('.year-select')
    .selectOption(year);

  await page.locator('.month-select')
    .selectOption(month);

  await page.locator(`text="${day}"`)
    .click();
}
```

### Usage

```ts
await selectDate(
  page,
  '#dob',
  '2026',
  'May',
  '21'
);
```

---

## 7. Common Assertions

### Verify Selected Date

```ts
await expect(
  page.locator('#date-picker')
).toHaveValue('21/05/2026');
```

### Verify Calendar Opened

```ts
await expect(
  page.locator('.calendar-popup')
).toBeVisible();
```

### Verify Disabled Date

```ts
await expect(
  page.locator('button[disabled]')
).toBeDisabled();
```

---

## 8. Best Practices

### Prefer Stable Locators

Good:

```ts
page.getByTestId('date-picker');
page.getByRole('textbox');
page.getByLabel('Date of Birth');
```

Avoid fragile selectors:

```ts
div:nth-child(2) > span
```

---

## 9. Running Tests

Run all tests:

```bash
npx playwright test
```

Run single test file:

```bash
npx playwright test tests/date-picker.spec.ts
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

## 10. References

- Playwright Docs  
  https://playwright.dev/docs/intro

- Playwright Locators  
  https://playwright.dev/docs/locators

- Assertions  
  https://playwright.dev/docs/test-assertions