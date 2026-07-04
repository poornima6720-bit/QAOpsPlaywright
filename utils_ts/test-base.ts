import { test as base } from '@playwright/test'
import { Interface } from 'node:readline';
interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
}

export const customTest= base.extend<{testDataForOrder:TestDataForOrder}>({
 
    testDataForOrder:
    {
        username: "ms.poornima67@gmail.com",
        password: "Nethra10!",
        productName: "ZARA COAT 3"
    }
})