import LoginPage from "./LoginPage.js";
import CartPage from "./CartPage.js";
import ShippingInfoPage from "./ShippingInfoPage.js";
import ThankYouPage from "./ThankYouPage.js";
import YourOrderPage from "./YourOrdersPage.js";
import OrderSummaryPage from "./OrderSummaryPage.js";

export default class POManager {
    constructor(page) {
        this.page=page;
        this.loginPage = new LoginPage(this.page)
        this.cartPage = new CartPage(this.page);
        this.shippingInfoPage = new ShippingInfoPage(this.page);
        this.thankYouPage= new ThankYouPage(this.page);
        this.yourOrdersPage= new YourOrderPage(this.page);
        this.orderSummaryPage= new OrderSummaryPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getCartPage() {
        return this.cartPage;
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