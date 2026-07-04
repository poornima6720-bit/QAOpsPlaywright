import { Page, Locator } from '@playwright/test'
export default class YourOrders {
    page: Page
    ordersTab: Locator
    tableRows: Locator

    constructor(page: Page) {
        this.page = page;
        this.ordersTab = page.locator("button[routerlink='/dashboard/myorders']");
        this.tableRows = page.locator('tbody tr');
    }

    async verifyOrderClickView(orderId: any) {

        await this.ordersTab.click();

        await this.tableRows.first().waitFor();
        const rowCount = await this.tableRows.count();
        for (let i = 0; i < rowCount; i++) {
            let actualOrderId:any
            actualOrderId = await this.tableRows.nth(i).locator('th').textContent();
            if (actualOrderId.trim() === orderId) {
                await this.tableRows.nth(i).locator('button').first().click();
                break;
            }
        }
    }
}