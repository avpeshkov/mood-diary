import "expect-puppeteer";

jest.mock("firebase/app");

describe("MoodDiary", () => {
    beforeAll(async () => {
        await page.goto("http://localhost:8080");
    });

    it('should display "Loading..." text on page', async () => {
        const text = await page.evaluate(() => document.body.textContent);
        expect(text).toContain("Loading...");
    });

    it("by default go to to home page", async () => {
        await page.waitForSelector("#home-screen-id");
        const text = await page.evaluate(() => document.body.textContent);
        expect(text).toContain("Welcome to Mood Diary");
    });

    it("Go to sing up page from home page", async () => {
        await page.goto("http://localhost:8080");
        await page.waitForSelector("#home-screen-id");
        page.click("#signup-link-id");
        await page.waitForSelector("#signup-page-id");
        const text = await page.evaluate(() => document.body.textContent);
        expect(text).toContain("Sign Up to Mood Diary");
    });

    it("Go to login page from home page", async () => {
        await page.goto("http://localhost:8080");
        await page.waitForSelector("#home-screen-id");
        page.click("#login-link-id");
        await page.waitForSelector("#login-page-id");
        const text = await page.evaluate(() => document.body.textContent);
        expect(text).toContain("Login to Mood Diary");
    });
});
