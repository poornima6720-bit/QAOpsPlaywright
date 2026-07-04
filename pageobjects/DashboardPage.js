export default class DashboardPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator('.card-body');
        this.productsText = page.locator('.card-body b')
        this.cartButton = page.locator("[routerlink='/dashboard/cart']");
        this.cartInfo = page.locator('div li');
    }

    async searchProductAddCart(productName) {
        const titles= await this.productsText.allTextContents();
        console.log(titles)

        const count = await this.products.count();

        for (let i = 0; i < count; i++) {
            const actualProductName = await this.products.nth(i).locator('b').textContent();
            if (actualProductName === productName) {
                await this.products.nth(i).locator('text= Add To Cart').click();
                await this.page.locator('#toast-container').waitFor();
                break;
            }
        }
    }

    async navigateToCart()
    {
        await this.cartButton.click();
        await this.cartInfo.first().waitFor();
    }
}