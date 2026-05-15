import {test, expect} from "@playwright/test";

test("title",async ({page}) =>{
    await page.goto("https://www.cricbuzz.com/");
    let title:string = await page.title();
    console.log("title:", title);
    await expect(page).toHaveTitle("IPL 2026 | Live Cricket Score, Schedule, News, Stats &amp; Videos | Cricbuzz.com");
})