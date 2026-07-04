import { expect } from "@playwright/test";
export default class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutBtn = page.locator("text=Checkout");
    }

    async verifyProductIsDisplayed(productName) {
        await this.page.locator("h3").first().waitFor();
        await expect(this.page.locator(`h3:has-text("${productName}")`)).toBeVisible();
    }

    async checkoutFunctionality() {
        await this.checkoutBtn.click();
    }
    
}