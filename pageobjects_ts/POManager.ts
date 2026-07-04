import LoginPage from "./LoginPage.js";
import CheckoutPage from "./CheckoutPage.js";
import ShippingInfoPage from "./ShippingInfoPage.js";
import ThankYouPage from "./ThankYouPage.js";
import YourOrderPage from "./YourOrdersPage.js";
import OrderSummaryPage from "./OrderSummaryPage.js";
import { Page } from "@playwright/test";

export default class POManager {
    page:Page
    loginPage: LoginPage
    checkoutPage: CheckoutPage
    shippingInfoPage: ShippingInfoPage
    thankYouPage: ThankYouPage
    yourOrdersPage: YourOrderPage
    orderSummaryPage: OrderSummaryPage

    constructor(page:Page) {
        this.page=page;
        this.loginPage = new LoginPage(this.page)
        this.checkoutPage = new CheckoutPage(this.page);
        this.shippingInfoPage = new ShippingInfoPage(this.page);
        this.thankYouPage= new ThankYouPage(this.page);
        this.yourOrdersPage= new YourOrderPage(this.page);
        this.orderSummaryPage= new OrderSummaryPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getShippingInfoPage() {
        return this.shippingInfoPage;
    }

    getThankYouPage()
    {
        return this.thankYouPage;
    }

    getYourOrdersPage()
    {
        return this.yourOrdersPage;
    }

    getOrderSummaryPage()
    {
        return this.orderSummaryPage;
    }
}