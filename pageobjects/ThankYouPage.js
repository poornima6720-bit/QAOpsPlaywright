import { expect } from "@playwright/test";
export default class ThankYouPage {
    constructor(page) {
        this.page = page;
        this.thankYouMsg = page.locator('.hero-primary');
        this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
        
    }

    async validateTitleOrder(thankYouValue) {
        await expect(this.thankYouMsg).toHaveText(thankYouValue);
        const orderIdValue = await this.orderId.textContent();
        console.log(orderIdValue);
        const orderId = orderIdValue.split(' ')[2];
        return orderId;
    }

    

}