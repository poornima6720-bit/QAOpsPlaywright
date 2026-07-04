import { test, expect, request } from '@playwright/test';
import API from '../utils/API.js';
const loginPayload= {userEmail: "poornima6723@gmail.com", userPassword: "Nethra10!"}
const orderPayload= {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]}

let response

test.beforeAll(async()=>
{
  const apiContext= await request.newContext();
  const api= new API(apiContext,loginPayload);
  response= await api.createOrder(orderPayload)
})

test.skip('Page Playwright Test', async ({page})=>{

    await page.addInitScript(value=>
    {
        window.localStorage.setItem('token',value)
    },response.token);

    const emailValue= 'poornima6723@gmail.com';
    const expectedProductName= 'ZARA COAT 3';
    const expectedOption= 'Cuba';
    
    await page.goto("https://rahulshettyacademy.com/client/");
    const ordersTab= page.locator("button[routerlink='/dashboard/myorders']");
    await ordersTab.click();
    const tableRows= page.locator('tbody tr');
    await tableRows.first().waitFor();
    const rowCount= await tableRows.count();
    for(let i=0; i< rowCount; i++)
    {
        const rowOrderId= await tableRows.nth(i).locator('th').textContent();
        if(response.orderId.includes(rowOrderId))
        {
            await tableRows.nth(i).locator('button').first().click();
            break;
        }
    }

    const OrderIdDetails= await page.locator('div .col-text').textContent();
    expect(await response.orderId.includes(OrderIdDetails.trim())).toBeTruthy();
    const emailCountryDetails= page.locator('.text');
    await expect(emailCountryDetails.first()).toHaveText(emailValue);
    await expect(emailCountryDetails.nth(1)).toContainText(expectedOption);
    const productNameDetails= page.locator('.artwork-card-info .title');
    await expect(productNameDetails).toHaveText(expectedProductName);
})