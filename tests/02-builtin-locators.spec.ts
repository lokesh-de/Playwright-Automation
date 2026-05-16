import {test, Locator, expect} from "@playwright/test";
test("Verify the built-in locators", async ({page}) => {
    await page.goto("https://demo.nopcommerce.com/")
    const logo:Locator = page.getByAltText("nopCommerce demo store")
    await expect(logo).toBeVisible();
    console.log("logo is visible", await logo.isVisible());
    await expect(page.getByText("Welcome to our store")).toBeVisible();
    console.log("welcome text is visible", await page.getByText("Welcome to our store").isVisible());
    await page.getByRole("link", {name: "Register"}).click(); 
    await expect(page.getByRole("heading", {name: "Register"})).toBeVisible();
    console.log("register heading is visible", await page.getByRole("heading", {name: "Register"}).isVisible());
    await page.getByLabel("first name:").fill("John");
    await page.getByLabel("last name:").fill("Doe");
    await page.getByLabel("email:").fill("john.doe@example.com");
    await page.getByPlaceholder("Search store").fill("Asus Laptop");
});

test.only("Verify Title locator", async ({page}) => {
    await page.goto("https://www.cricbuzz.com/")
    await expect(page.getByTitle("IPL 2026 - Home")).toHaveText("Home");
});