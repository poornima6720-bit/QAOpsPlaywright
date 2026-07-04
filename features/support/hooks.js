import POManager from '../../pageobjects/POManager.js';
import { chromium } from "@playwright/test";
import { Before, After, AfterStep, Status } from "@cucumber/cucumber";

Before(async function () {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshot1.png' });
    }
});

After(async function () {
    // Assuming this.driver is a selenium webdriver
    console.log("Last one to execute")
   // await this.browser.close();
});
