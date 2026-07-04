export default class API2
{
    constructor(apiContext){
        this.apiContext= apiContext;
        //this.loginPayload= loginPayload;
    }

    async getToken(loginPayload)
    {
        const tokenResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:loginPayload});
        const tokenJsonResponse= await tokenResponse.json();
        console.log(tokenJsonResponse)
        const token= tokenJsonResponse.token;
        return token;
    }

    async createOrder(orderPayload,loginPayload)
    {
        let responseData= {};
        responseData.token= await this.getToken(loginPayload);
        const orderResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'Authorization': responseData.token,
                    'Content-Type': 'application/json'
                }

            })

            const orderJsonResponse= await orderResponse.json();
            console.log(orderJsonResponse);
            const orderId= orderJsonResponse.orders[0]
            responseData.orderId= orderId;
            return responseData;
    }
}