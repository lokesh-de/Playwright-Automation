import {test, expect} from "@playwright/test";
test("Verify CSS locators", async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/login");
    await expect(page.locator("input#small-searchterms")).toBeVisible();
    await page.locator("input#small-searchterms").fill("14.1-inch Laptop");
    await page.locator(".ico-register").click();
    await page.locator("input[name='FirstName']").fill("John");
    await page.locator("input.text-box.single-line[name='LastName']").fill("Doe");
    await page.pause();
});