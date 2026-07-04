import { expect, Page, Locator } from "@playwright/test";
export default class ShippingInfoPage {
    page:Page
    nameOnCard: Locator
    cvvcode: Locator
    country: Locator
    options: Locator
    optionValue: Locator
    emailLabel: Locator
    placeOrderBtn: Locator

    constructor(page:Page) {
        this.page = page
        this.nameOnCard = page.locator('div.field').filter({ hasText: "Name on Card" }).locator("input");
        this.cvvcode = page.locator('div.field').filter({ hasText: "CVV Code" }).locator("input");
        this.country = page.locator("[placeholder='Select Country']");
        this.options = page.locator('.ta-results');
        this.optionValue = page.locator('.ta-results button');
        this.emailLabel = page.locator('.user__name label');
        this.placeOrderBtn = page.locator('.action__submit');
    }

    async fillShippingInfo(countryOption:string) {
        await this.nameOnCard.fill("Poornima");
        await this.cvvcode.fill("123");
        await this.country.pressSequentially('Ind', { delay: 150 });
        await this.options.waitFor();

        const optionCount = await this.optionValue.count();

        for (let i = 0; i < optionCount; i++) {
            const actualValue = await this.optionValue.nth(i).textContent();
            if (actualValue?.trim() === countryOption) {
                await this.optionValue.nth(i).click();
                console.log(actualValue);
                break;
            }
        }

    }

    async placeOrder(username:string)
    {
        await expect(this.emailLabel).toHaveText(username);
        await this.placeOrderBtn.click();
    }

}