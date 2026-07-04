import {expect} from '@playwright/test';
export default class OrderSummaryPage {
    constructor(page) {
        this.page = page;
        this.OrderIdDetails = page.locator('div .col-text');
        this.emailCountryDetails = page.locator('.text');
        this.productNameDetails = page.locator('.artwork-card-info .title');
    }

    async verifySummary(orderId,username,countryOption,productName) {

        await expect(this.OrderIdDetails).toHaveText(orderId);
        await expect(this.emailCountryDetails.first()).toHaveText(username);
        await expect(this.emailCountryDetails.nth(1)).toContainText(countryOption);
        await expect(this.productNameDetails).toHaveText(productName);
    }
}