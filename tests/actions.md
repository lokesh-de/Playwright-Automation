````md id="a4k8pz"
# Playwright Actions Examples (TypeScript)

## 1. Introduction

Actions are used to interact with web elements in Playwright.

Common actions:
- Click
- Double Click
- Right Click
- Hover
- Type
- Fill
- Press Keys
- Drag and Drop
- Upload Files
- Keyboard Actions
- Mouse Actions

Playwright automatically:
- waits for elements
- checks visibility
- ensures element stability

---

## 2. Click Action

---

## Basic Click

```ts
import { test } from '@playwright/test';

test('click example', async ({ page }) => {
  await page.goto('https://example.com');

  await page.locator('#login-button')
    .click();
});
```

---

## Double Click

```ts
await page.locator('#button')
  .dblclick();
```

---

## Right Click

```ts
await page.locator('#button')
  .click({ button: 'right' });
```

---

## Click with Position

```ts
await page.locator('#canvas')
  .click({
    position: {
      x: 100,
      y: 50
    }
  });
```

---

## 3. Fill and Type Actions

---

## Fill Input Field

Replaces existing value.

```ts
await page.locator('#username')
  .fill('admin');
```

---

## Type Text Slowly

```ts
await page.locator('#search')
  .type('Playwright', {
    delay: 100
  });
```

---

## Clear Input Field

```ts
await page.locator('#search')
  .clear();
```

---

## 4. Keyboard Actions

---

## Press Single Key

```ts
await page.locator('#search')
  .press('Enter');
```

---

## Press Keyboard Shortcut

```ts
await page.keyboard.press('Control+A');
```

---

## Type Using Keyboard

```ts
await page.keyboard.type('Hello World');
```

---

## Key Down and Key Up

```ts
await page.keyboard.down('Shift');

await page.keyboard.press('KeyA');

await page.keyboard.up('Shift');
```

---

## 5. Hover Action

Moves mouse over element.

```ts
await page.locator('.menu')
  .hover();
```

---

## Hover Dropdown Example

```ts
import { test } from '@playwright/test';

test('hover example', async ({ page }) => {
  await page.goto('https://example.com');

  await page.locator('.menu')
    .hover();

  await page.locator('text="Settings"')
    .click();
});
```

---

## 6. Drag and Drop

---

## Basic Drag and Drop

```ts
await page.locator('#source')
  .dragTo(
    page.locator('#target')
  );
```

---

## Complete Example

```ts
import { test } from '@playwright/test';

test('drag and drop example', async ({ page }) => {
  await page.goto('https://example.com');

  await page.locator('#drag-item')
    .dragTo(
      page.locator('#drop-area')
    );
});
```

---

## 7. File Upload

---

## Upload Single File

```ts
await page.locator('#file-upload')
  .setInputFiles('tests/data/sample.pdf');
```

---

## Upload Multiple Files

```ts
await page.locator('#file-upload')
  .setInputFiles([
    'tests/data/file1.pdf',
    'tests/data/file2.pdf'
  ]);
```

---

## Remove Uploaded Files

```ts
await page.locator('#file-upload')
  .setInputFiles([]);
```

---

## 8. Select Dropdown Action

---

## Select by Value

```ts
await page.locator('#country')
  .selectOption('india');
```

---

## Select by Label

```ts
await page.locator('#country')
  .selectOption({
    label: 'India'
  });
```

---

## Multi Select

```ts
await page.locator('#skills')
  .selectOption([
    'java',
    'playwright'
  ]);
```

---

## 9. Checkbox and Radio Button Actions

---

## Check Checkbox

```ts
await page.locator('#remember')
  .check();
```

---

## Uncheck Checkbox

```ts
await page.locator('#remember')
  .uncheck();
```

---

## Select Radio Button

```ts
await page.locator('#male')
  .check();
```

---

## 10. Mouse Actions

---

## Mouse Move

```ts
await page.mouse.move(100, 200);
```

---

## Mouse Click

```ts
await page.mouse.click(100, 200);
```

---

## Mouse Double Click

```ts
await page.mouse.dblclick(100, 200);
```

---

## Mouse Wheel Scroll

```ts
await page.mouse.wheel(0, 500);
```

---

## 11. Scroll Actions

---

## Scroll Into View

```ts
await page.locator('#footer')
  .scrollIntoViewIfNeeded();
```

---

## Scroll Page

```ts
await page.mouse.wheel(0, 1000);
```

---

## 12. Focus and Blur Actions

---

## Focus Element

```ts
await page.locator('#username')
  .focus();
```

---

## Blur Element

```ts
await page.locator('#username')
  .blur();
```

---

## 13. Screenshot Action

---

## Full Page Screenshot

```ts
await page.screenshot({
  path: 'fullpage.png',
  fullPage: true
});
```

---

## Element Screenshot

```ts
await page.locator('.card')
  .screenshot({
    path: 'card.png'
  });
```

---

## 14. Wait Actions

---

## Wait for Selector

```ts
await page.waitForSelector('#login');
```

---

## Wait for URL

```ts
await page.waitForURL('**/dashboard');
```

---

## Wait for Load State

```ts
await page.waitForLoadState('networkidle');
```

---

## 15. Frame Actions

---

## Interact with iFrame

```ts
const frame = page.frameLocator('#login-frame');

await frame.locator('#username')
  .fill('admin');
```

---

## 16. Dialog Actions

---

## Handle Alert

```ts
page.on('dialog', async dialog => {
  await dialog.accept();
});

await page.locator('#alert-button')
  .click();
```

---

## 17. Reusable Utility Functions

---

## Click Utility

```ts
export async function clickElement(
  page,
  selector: string
) {
  await page.locator(selector)
    .click();
}
```

---

## Fill Utility

```ts
export async function fillInput(
  page,
  selector: string,
  value: string
) {
  await page.locator(selector)
    .fill(value);
}
```

---

## 18. Best Practices

---

## Prefer Locator Actions

Recommended:

```ts
await page.locator('#login')
  .click();
```

Avoid:

```ts
await page.click('#login');
```

---

## Use Auto Waiting

Avoid:

```ts
await page.waitForTimeout(5000);
```

Prefer:

```ts
await locator.click();
```

---

## Use Stable Selectors

Good:

```ts
page.getByRole('button');
page.getByTestId('submit-btn');
```

Avoid:

```ts
div:nth-child(3) button
```

---

## 19. Common Errors

---

## Error: Element not visible

Fix:
- wait for visibility
- ensure element exists

```ts
await expect(locator)
  .toBeVisible();
```

---

## Error: Element detached from DOM

Occurs when page updates dynamically.

Fix:
- re-locate element before action

---

## Error: Timeout exceeded

Fix:
- increase timeout
- verify locator
- check page loading

---

## 20. Running Tests

Run all tests:

```bash
npx playwright test
```

Run single file:

```bash
npx playwright test tests/actions.spec.ts
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

## 21. References

- Playwright Actions  
  https://playwright.dev/docs/input

- Playwright Mouse  
  https://playwright.dev/docs/api/class-mouse

- Playwright Keyboard  
  https://playwright.dev/docs/api/class-keyboard

- Playwright File Upload  
  https://playwright.dev/docs/input#upload-files

---

## Summary

This guide covered:

- Click actions
- Hover actions
- Keyboard actions
- Mouse actions
- Drag and drop
- File upload
- Dropdown actions
- Checkbox actions
- Scroll actions
- Screenshot actions
- Wait actions
- Dialog actions
- Best practices
- Common errors

Playwright provides powerful and auto-waiting action APIs for reliable browser automation.
````