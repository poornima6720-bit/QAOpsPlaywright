import { expect, Page, Locator } from "@playwright/test";
import { error } from "node:console";
export default class ThankYouPage {
    page: Page
    thankYouMsg: Locator
    orderId: Locator

    constructor(page:Page) {
        this.page = page;
        this.thankYouMsg = page.locator('.hero-primary');
        this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
        
    }

    async validateTitleOrder(thankYouValue:string) {
        await expect(this.thankYouMsg).toHaveText(thankYouValue);
        let orderIdValue: any;
        orderIdValue = await this.orderId.textContent();
        console.log(orderIdValue);
        const orderId = orderIdValue.split(' ')[2];
        return orderId;
    }
}