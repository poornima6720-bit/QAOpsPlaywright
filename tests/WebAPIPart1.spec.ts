import { test, expect, request } from '@playwright/test';
import API from '../utils_ts/API';

const loginPayload = {
    userEmail: "poornima6723@gmail.com",
    userPassword: "Nethra10!"
};

const orderPayload = {
    orders: [
        {
            country: "Cuba",
            productOrderedId: "6960eac0c941646b7a8b3e68"
        }
    ]
};

let response: any;

test.beforeAll(async () => {

    const apiContext = await request.newContext();

    const apiutils = new API(apiContext, loginPayload);

    response = await apiutils.createOrder(orderPayload);

});

test('@API Page Playwright Test', async ({ page }) => {

    await page.addInitScript((value) => {
        window.localStorage.setItem('token', value);
    }, response.token);

    const emailValue = "poornima6723@gmail.com";
    const expectedProductName = "ZARA COAT 3";
    const expectedOption = "Cuba";

    await page.goto("https://rahulshettyacademy.com/client/");

    const ordersTab = page.locator("button[routerlink='/dashboard/myorders']");

    await ordersTab.click();

    const tableRows = page.locator("tbody tr");

    await tableRows.first().waitFor();

    const rowCount = await tableRows.count();

    for (let i = 0; i < rowCount; i++) {

        const rowOrderId = await tableRows
            .nth(i)
            .locator("th")
            .textContent();

        if (rowOrderId && response.orderId.includes(rowOrderId.trim())) {

            await tableRows
                .nth(i)
                .locator("button")
                .first()
                .click();

            break;
        }
    }

    const orderIdDetails = await page
        .locator("div .col-text")
        .textContent();

    expect(
        response.orderId.includes(orderIdDetails?.trim())
    ).toBeTruthy();

    const emailCountryDetails = page.locator(".text");

    await expect(emailCountryDetails.first()).toHaveText(emailValue);

    await expect(emailCountryDetails.nth(1)).toContainText(expectedOption);

    const productNameDetails = page.locator(".artwork-card-info .title");

    await expect(productNameDetails).toHaveText(expectedProductName);

    await page.pause();
});