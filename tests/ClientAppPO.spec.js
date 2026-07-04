import { test, expect } from '@playwright/test';
import {customtest} from '../utils/test-base.js';
import POManager from '../pageobjects/POManager.js';
import dataset from '../utils/placeorderTestData.json' with { type: 'json' };

for(const data of dataset)
{
test(`@Web Client App Login for ${data.productName}`, async ({ page }) => {

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goto();

    const dashboardPage = await loginPage.validLogin(data.username, data.password);
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(data.productName)
    await cartPage.checkoutFunctionality();

    const shippingInfoPage = poManager.getShippingInfoPage();
    await shippingInfoPage.fillShippingInfo(data.countryOption);
    await shippingInfoPage.placeOrder(data.username)

    const thankYouPage = poManager.getThankYouPage();
    const orderId= await thankYouPage.validateTitleOrder(data.thankYouValue);
    
    const yourOrdersPage= poManager.getYourOrdersPage();
    await yourOrdersPage.verifyOrderClickView(orderId);
    
    const orderSummaryPage= poManager.getOrderSummaryPage();
    await orderSummaryPage.verifySummary(orderId,data.username,data.countryOption,data.productName);

})
}

customtest(`Client App Login`, async ({ page,testDataForOrder }) => {

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goto();

    const dashboardPage = await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.checkoutFunctionality(testDataForOrder.productName);
})