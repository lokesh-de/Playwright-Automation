import {test, expect} from "@playwright/test";
test("Vefify UI elements on the page", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill("lokeshavula80@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Lokesh123@");
    await page.getByRole("button", {name: "Login"}).click();
    await page.locator(".card").first().getByRole("button", { name: "Add To Cart" }).click();
    await page.locator("button[routerlink='/dashboard/cart']").click();
    await page.getByRole("button", { name: "Checkout" }).click();
    const country = page.locator("input[placeholder='Select Country']");
    await country.click();
    await country.pressSequentially("ind", {delay: 300});
    await page.locator(".ta-results").getByText("India", { exact: true }).click();
    await page.getByText("Place Order", { exact: true }).click();
    await page.getByRole("button", {name: "Click To Download Order Details in CSV"}).click();
});