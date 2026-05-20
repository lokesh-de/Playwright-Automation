import {test, expect, Locator} from "@playwright/test";
test("Verify Playwright actions", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const textBox:Locator = page.locator("#name");
    await expect(textBox).toBeVisible();
    await expect(textBox).toBeEnabled();
    const maxLength:string | null = await textBox.getAttribute("maxlength");
    console.log("Max Length:", maxLength);
    expect(maxLength).toBe("15");
    await textBox.fill("Virat Kohli");
    const inputValue:string = await textBox.inputValue();
    console.log("Input Value:", inputValue);
    expect(inputValue).toBe("Virat Kohli");
});