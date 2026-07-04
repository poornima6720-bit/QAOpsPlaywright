import { expect, Locator, Page } from "@playwright/test";
export default class CheckoutPage {
    page: Page
    checkoutBtn: Locator
    
    constructor(page:Page) {
        this.page = page;
        this.checkoutBtn = page.locator("text=Checkout");

    }

    async checkoutFunctionality(productName:string) {
        await expect(this.page.locator(`h3:has-text("${productName}")`)).toBeVisible();
        await this.checkoutBtn.click();
    }

}