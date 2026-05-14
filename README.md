# Playwright

## What is Playwright?

Playwright is an open-source automation testing framework developed by Microsoft for end-to-end (E2E) testing of modern web applications.

It allows testers and developers to automate browsers using a single API and supports:

* Chromium
* Firefox
* WebKit (Safari Engine)

Playwright is widely used for:

* UI Automation Testing
* Cross-Browser Testing
* API Testing
* Regression Testing
* Web Scraping
* Performance Validation

Official Website:
[https://playwright.dev](https://playwright.dev)

---

# Why Playwright is Needed

Modern web applications are dynamic and highly interactive. Traditional automation tools often face issues such as:

* Flaky tests
* Slow execution
* Browser compatibility problems
* Dynamic element handling
* Synchronization issues

Playwright solves these problems using modern automation architecture.

### Key Reasons to Use Playwright

* **Auto Waiting**: Automatically waits for elements and network responses.
* **Cross-Browser Support**: Single framework for multiple browsers.
* **Faster Execution**: Supports parallel test execution.
* **Reliable Automation**: Reduces flaky test failures.
* **Modern Web Application Support**: Works efficiently with React, Angular, Vue, and SPA applications.

---

# Advantages of Playwright

## Cross-Browser Testing

* **Supports Multiple Browsers**: Chromium, Firefox, and WebKit.
* **Single API**: Write once and run everywhere.

## Faster Execution

* **Parallel Testing**: Execute multiple tests simultaneously.
* **Headless Mode**: Faster automation without browser UI.

## Auto Waiting Mechanism

* **No Manual Waits Needed**: Automatically waits for elements to become ready.
* **Stable Test Execution**: Improves reliability.

## Better Debugging Features

* **Trace Viewer**
* **Screenshots on Failure**
* **Video Recording**
* **Inspector Tool**

These features help quickly identify issues during test execution.

## API Testing Support

* **Built-in API Automation**
* **Authentication Testing**
* **Session and Token Handling**

## Modern Framework Compatibility

Playwright works efficiently with:

* React
* Angular
* Vue
* Next.js

---

# Playwright vs Other Automation Tools

| Feature                  | Playwright | Selenium              | Cypress |
| ------------------------ | ---------- | --------------------- | ------- |
| Cross-Browser Support    | Excellent  | Good                  | Limited |
| Speed                    | Very Fast  | Moderate              | Fast    |
| Auto Waiting             | Built-in   | Mostly Manual         | Partial |
| Parallel Execution       | Easy       | Complex               | Limited |
| Multi-Tab Support        | Excellent  | Moderate              | Weak    |
| API Testing              | Built-in   | External Tools Needed | Limited |
| Debugging Features       | Advanced   | Basic                 | Good    |
| Modern Framework Support | Excellent  | Moderate              | Good    |

---

# Future Scope of Playwright

Playwright adoption is increasing rapidly in the software industry.

## Growing Industry Demand

* Many organizations are moving from Selenium to Playwright.
* Modern companies prefer faster and more reliable automation frameworks.
* Strong integration support for CI/CD pipelines.

## Career Opportunities

Playwright skills are valuable for:

* QA Automation Engineers
* SDET Engineers
* Test Architects
* Full Stack Developers
* DevOps QA Engineers

## Future Trends

* AI-Powered Testing
* Cloud-Based Automation
* Self-Healing Frameworks
* Enterprise-Level Test Automation

---

# Prerequisites

Before installing Playwright, install the following:

* Node.js
* npm (comes with Node.js)

Check installation:

```bash
node -v
npm -v
```

Download Node.js:
[https://nodejs.org](https://nodejs.org)

---

# Playwright Setup and Installation

## Step 1: Create Project Folder

```bash
mkdir playwright-project
cd playwright-project
```

---

## Step 2: Initialize Node.js Project

```bash
npm init -y
```

---

## Step 3: Install Playwright

```bash
npm init playwright@latest
```

This command will:

* Install Playwright
* Download supported browsers
* Create sample test files
* Generate configuration files

---

## Step 4: Install Browsers Manually (Optional)

```bash
npx playwright install
```

Install specific browser:

```bash
npx playwright install chromium
```

---

# Playwright Project Structure

```plaintext
playwright-project/
│
├── tests/
│   └── example.spec.js
│
├── playwright.config.js
├── package.json
└── node_modules/
```

---

# Running Playwright Tests

## Run All Tests

```bash
npx playwright test
```

## Run Specific Test File

```bash
npx playwright test tests/example.spec.js
```

## Run Tests in Headed Mode

```bash
npx playwright test --headed
```

## Run Tests in Debug Mode

```bash
npx playwright test --debug
```

---

# Sample Playwright Test

```javascript
const { test, expect } = require('@playwright/test');

test('Homepage Test', async ({ page }) => {

  await page.goto('https://example.com');

  await expect(page).toHaveTitle(/Example/);

});
```

---

# HTML Reports

## Generate Test Report

```bash
npx playwright test
```

## Open HTML Report

```bash
npx playwright show-report
```

---

# Useful Playwright Commands

## Install Playwright

```bash
npm init playwright@latest
```

## Install Browsers

```bash
npx playwright install
```

## Run Tests

```bash
npx playwright test
```

## Run Tests in UI Mode

```bash
npx playwright test --ui
```

## Run Tests in Debug Mode

```bash
npx playwright test --debug
```

## Open HTML Report

```bash
npx playwright show-report
```

## Generate Automation Code

```bash
npx playwright codegen
```

---

# CI/CD Integration

Playwright integrates easily with:

* GitHub Actions
* Jenkins
* GitLab CI/CD
* Azure DevOps

### Benefits

* Automated testing
* Faster deployments
* Continuous integration
* Better release quality

---

# Best Practices

## Use Stable Locators

* Prefer `getByRole()`
* Prefer `getByTestId()`
* Avoid unstable XPath selectors

## Avoid Hard Waits

* Use Playwright auto-waiting features
* Avoid unnecessary `waitForTimeout()`

## Use Page Object Model (POM)

* Better code maintainability
* Reusable automation components

## Run Tests in Parallel

* Faster execution
* Improved CI/CD performance

## Capture Failures

* Enable screenshots
* Enable video recording
* Use trace viewer for debugging

---

# Conclusion

Playwright is one of the most powerful modern automation frameworks available today.

### Key Benefits

* Fast execution
* Reliable automation
* Cross-browser support
* Advanced debugging tools
* Modern web application compatibility

Due to its growing industry adoption and advanced capabilities, Playwright is considered a future-proof automation testing framework.

---

# Useful Resources

## Official Documentation

[https://playwright.dev/docs/intro](https://playwright.dev/docs/intro)

## GitHub Repository

[https://github.com/microsoft/playwright](https://github.com/microsoft/playwright)

## API Documentation

[https://playwright.dev/docs/api/class-playwright](https://playwright.dev/docs/api/class-playwright)
