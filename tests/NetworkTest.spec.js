import { test, expect, request } from '@playwright/test';
import APIUtils from '../utils/APIUtils.js';

const loginPayload = {userEmail: "poornima6723@gmail.com",userPassword: "Nethra10!"};
const orderPayload = {orders: [{country: "Cuba",productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const fakePayLoadOrders= {data:[],message:"No Orders"};
let response;

test.beforeAll(async ()=>{
    const apiContext= await request.newContext();
    const apiutils= new APIUtils(apiContext,loginPayload);
     response= await apiutils.createOrder(orderPayload);
    
})

test('Page Playwright Test', async ({page})=>{

    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value)
    },response.token);

    const emailValue= 'poornima6723@gmail.com';
    const expectedProductName= 'ZARA COAT 3';
    const expectedOption= 'Cuba';
    
     await page.goto("https://rahulshettyacademy.com/client/");

     await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route=>
        {
           const response= await page.request.fetch(route.request());
           let body= JSON.stringify(fakePayLoadOrders);
           route.fulfill(
            {
                response,
                body,
            });

        }
     )

    const ordersTab= page.locator("button[routerlink='/dashboard/myorders']");
    await ordersTab.click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator('.mt-4').textContent())
    
})