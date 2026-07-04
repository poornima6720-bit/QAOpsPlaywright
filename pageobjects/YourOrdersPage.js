export default class YourOrders {
    constructor(page) {
        this.page = page;
        this.ordersTab = page.locator("button[routerlink='/dashboard/myorders']"); 
        this.tableRows = page.locator('tbody tr');
    }

    async verifyOrderClickView(orderId) {

        this.ordersTab.click();

        await this.tableRows.first().waitFor();
        const rowCount = await this.tableRows.count();
        for (let i = 0; i < rowCount; i++) {
            const actualOrderId = await this.tableRows.nth(i).locator('th').textContent();
            if (actualOrderId.trim() === orderId) {
                await this.tableRows.nth(i).locator('button').first().click();
                break;
            }
        }
    }
}