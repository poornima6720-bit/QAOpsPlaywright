import { test, expect } from '@playwright/test';
import {customTest} from '../utils_ts/test-base.ts'
import POManager from '../pageobjects_ts/POManager.ts'
import dataset from '../utils_ts/placeorderTestData.json'

for(const data of dataset)
{
test(`@Web Client App Login for ${data.productName}`, async ({ page }) => {

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goto();

    const dashboardPage = await loginPage.validLogin(data.username, data.password);
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.checkoutFunctionality(data.productName);

    const shippingInfoPage = poManager.getShippingInfoPage();
    await shippingInfoPage.fillShippingInfo(data.countryOption);
    await shippingInfoPage.placeOrder(data.username)

    const thankYouPage = poManager.getThankYouPage();
    let orderId:any
    orderId= await thankYouPage.validateTitleOrder(data.thankYouValue);
    
    const yourOrdersPage= poManager.getYourOrdersPage();
    await yourOrdersPage.verifyOrderClickView(orderId);
    
    const orderSummaryPage= poManager.getOrderSummaryPage();
    await orderSummaryPage.verifySummary(orderId,data.username,data.countryOption,data.productName);

})
}
customTest(`Client App Login`, async ({ page,testDataForOrder }) => {

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goto();

    const dashboardPage = await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.checkoutFunctionality(testDataForOrder.productName);
})