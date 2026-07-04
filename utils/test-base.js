import { test as base } from '@playwright/test'

export const customtest= base.extend({
    testDataForOrder:
    {
        username: "ms.poornima67@gmail.com",
        password: "Nethra10!",
        productName: "ZARA COAT 3"
    }
})