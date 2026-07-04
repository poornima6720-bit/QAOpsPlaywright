import { Given, When, Then } from "@cucumber/cucumber";
import POManager from '../../pageobjects/POManager.js';
import { chromium } from "@playwright/test";
import { expect } from "@playwright/test";

Given('a login to Ecommerce application with {string} and {string}', { timeout: 20000 }, async function (username, password) {

    // Write code here that turns the phrase above into concrete actions
    this.username = username;

    this.loginPage = this.poManager.getLoginPage();
    await this.loginPage.goto();

    this.dashboardPage = await this.loginPage.validLogin(this.username, password);
});

When('Add {string} to cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    this.productName = productName;
    await this.dashboardPage.searchProductAddCart(this.productName);
    await this.dashboardPage.navigateToCart();
});

Then('{string} is displayed in the Cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions

    const cartPage = this.poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(this.productName)
    await cartPage.checkoutFunctionality();
});

When('Enter valid details like Country {string} and Place the Order', async function (countryOption) {
    // Write code here that turns the phrase above into concrete actions
    this.countryOption = countryOption;
    const shippingInfoPage = this.poManager.getShippingInfoPage();
    await shippingInfoPage.fillShippingInfo(this.countryOption);
    await shippingInfoPage.placeOrder(this.username)
});

Then('{string} message should be displayed', async function (thankYouValue) {
    const thankYouPage = this.poManager.getThankYouPage();
    this.orderId = await thankYouPage.validateTitleOrder(thankYouValue);
});

Then('Verify order is present in the OrderHistory', async function () {

    const yourOrdersPage = this.poManager.getYourOrdersPage();
    await yourOrdersPage.verifyOrderClickView(this.orderId);
    const orderSummaryPage = this.poManager.getOrderSummaryPage();
    await orderSummaryPage.verifySummary(
        this.orderId,
        this.username,
        this.countryOption,
        this.productName
    );
});


Given('a login to Ecommerce2 application with {string} and {string}', { timeout: 10000 }, async function (userName, password) {

    const userNameField = this.page.locator('#username');
    const passwordField = this.page.locator("[type='password']");
    const signIn = this.page.locator("#signInBtn");
    
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await userNameField.fill(userName);
    await passwordField.fill(password);
    await this.page.locator(".checkmark").first().click();
    await signIn.click();
});

Then('Verify Error message is displayed', async function () {

    const errorMsg = await this.page.locator("[style*='block']").textContent();
    console.log(errorMsg);
    await expect(errorMsg).toContain('Incorrect');
});

// await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
// console.log(await page.title());
// await userName.fill("rahulshetty");
// await password.fill("learning");
// await page.locator(".checkmark").first().click();
// await page.locator("#signInBtn").click();
// const errorMsg= await page.locator("[style*='block']").textContent();
// console.log(errorMsg);
// await expect(errorMsg).toContain('Incorrect');