````md id="s0kq9v"
# Playwright Alerts and Dialogs Examples (TypeScript)

## 1. Introduction

JavaScript dialogs are popup windows displayed by the browser.

Common dialog types:
- Alert
- Confirm
- Prompt
- BeforeUnload

In Playwright, dialogs are handled using:

```ts
page.on('dialog', async dialog => {
  // handle dialog
});
```

---

## 2. Handling Alert Dialog

Alert dialogs contain:
- message
- OK button

## Example

```ts
import { test } from '@playwright/test';

test('handle alert dialog', async ({ page }) => {
  await page.goto('https://example.com');

  // Listen for alert
  page.on('dialog', async dialog => {
    console.log(dialog.message());

    // Accept alert
    await dialog.accept();
  });

  // Trigger alert
  await page.locator('#alert-button').click();
});
```

---

## 3. Handling Confirm Dialog

Confirm dialogs contain:
- OK button
- Cancel button

## Accept Confirm Dialog

```ts
import { test } from '@playwright/test';

test('accept confirm dialog', async ({ page }) => {
  await page.goto('https://example.com');

  page.on('dialog', async dialog => {
    console.log(dialog.message());

    // Accept confirm dialog
    await dialog.accept();
  });

  await page.locator('#confirm-button').click();
});
```

---

## Reject Confirm Dialog

```ts
import { test } from '@playwright/test';

test('dismiss confirm dialog', async ({ page }) => {
  await page.goto('https://example.com');

  page.on('dialog', async dialog => {
    console.log(dialog.message());

    // Dismiss dialog
    await dialog.dismiss();
  });

  await page.locator('#confirm-button').click();
});
```

---

## 4. Handling Prompt Dialog

Prompt dialogs contain:
- input field
- OK button
- Cancel button

## Example

```ts
import { test } from '@playwright/test';

test('handle prompt dialog', async ({ page }) => {
  await page.goto('https://example.com');

  page.on('dialog', async dialog => {
    console.log(dialog.message());

    // Enter value in prompt
    await dialog.accept('Playwright User');
  });

  await page.locator('#prompt-button').click();
});
```

---

## 5. Handling BeforeUnload Dialog

Triggered when leaving page with unsaved changes.

## Example

```ts
import { test } from '@playwright/test';

test('handle beforeunload dialog', async ({ page }) => {
  await page.goto('https://example.com');

  page.on('dialog', async dialog => {
    console.log(dialog.type());

    await dialog.accept();
  });

  // Trigger page unload
  await page.close({ runBeforeUnload: true });
});
```

---

## 6. Capture Dialog Information

## Example

```ts
import { test } from '@playwright/test';

test('capture dialog information', async ({ page }) => {
  await page.goto('https://example.com');

  page.on('dialog', async dialog => {
    console.log('Type:', dialog.type());
    console.log('Message:', dialog.message());
    console.log('Default Value:', dialog.defaultValue());

    await dialog.accept();
  });

  await page.locator('#dialog-button').click();
});
```

---

## 7. Using `waitForEvent()` for Dialogs

Alternative approach.

## Example

```ts
import { test } from '@playwright/test';

test('handle dialog using waitForEvent', async ({ page }) => {
  await page.goto('https://example.com');

  const dialogPromise = page.waitForEvent('dialog');

  await page.locator('#alert-button').click();

  const dialog = await dialogPromise;

  console.log(dialog.message());

  await dialog.accept();
});
```

---

## 8. Reusable Utility Function

## Accept Dialog

```ts
export async function acceptDialog(page) {
  page.on('dialog', async dialog => {
    console.log(dialog.message());

    await dialog.accept();
  });
}
```

## Usage

```ts
await acceptDialog(page);

await page.locator('#alert-button').click();
```

---

## 9. Common Assertions

### Verify Success Message After Alert

```ts
await expect(
  page.locator('.success-message')
).toBeVisible();
```

### Verify Text After Confirm

```ts
await expect(
  page.locator('#result')
).toHaveText('You clicked OK');
```

### Verify Prompt Result

```ts
await expect(
  page.locator('#prompt-result')
).toHaveText('Playwright User');
```

---

## 10. Best Practices

### Register Dialog Listener Before Action

Correct:

```ts
page.on('dialog', async dialog => {
  await dialog.accept();
});

await page.click('#alert-button');
```

Avoid:

```ts
await page.click('#alert-button');

page.on('dialog', async dialog => {
  await dialog.accept();
});
```

---

### Use `waitForEvent()` for Single Dialogs

```ts
const dialogPromise = page.waitForEvent('dialog');
```

Useful for:
- isolated tests
- one-time dialogs

---

### Always Handle Dialogs

Unhandled dialogs can block test execution.

Always:
- `accept()`
- or `dismiss()`

---

## 11. Common Errors

### Error: Dialog already handled

Occurs when:
- dialog is accepted twice
- multiple listeners exist

Fix:
- Use one listener only

---

### Error: Test timeout

Occurs when:
- dialog is not handled

Fix:

```ts
page.on('dialog', async dialog => {
  await dialog.accept();
});
```

---

## 12. Running Tests

Run all tests:

```bash
npx playwright test
```

Run single file:

```bash
npx playwright test tests/dialog.spec.ts
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

## 13. References

- Playwright Dialogs  
  https://playwright.dev/docs/dialogs

- Playwright Assertions  
  https://playwright.dev/docs/test-assertions

- Playwright Events  
  https://playwright.dev/docs/events

---

# Summary

This guide covered:

- Alert dialogs
- Confirm dialogs
- Prompt dialogs
- BeforeUnload dialogs
- Dialog assertions
- `waitForEvent()`
- Reusable utilities
- Best practices
- Common errors

Playwright provides simple and reliable APIs for handling browser dialogs and alerts.
````
