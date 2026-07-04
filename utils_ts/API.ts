import { APIRequestContext } from "@playwright/test";

export default class API {

    apiContext: APIRequestContext;
    loginPayload: any;

    constructor(apiContext: APIRequestContext, loginPayload: any) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {

        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            }
        );

        const loginResponseJson = await loginResponse.json();

        const token = loginResponseJson.token;

        console.log(token);

        return token;
    }

    async createOrder(orderPayload: any) {

        let response: any = {};

        response.token = await this.getToken();

        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    Authorization: response.token,
                    "Content-Type": "application/json"
                }
            }
        );

        const orderResponseJson = await orderResponse.json();

        console.log(orderResponseJson);

        response.orderId = orderResponseJson.orders[0];

        return response;
    }
}