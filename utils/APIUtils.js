export default class APIUtils
{
constructor(apiContext,loginPayload)
{
 this.apiContext= apiContext;
 this.loginPayload= loginPayload;
}
async getToken()
{ 
    const loginResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:this.loginPayload});
    const loginResponseJson= await loginResponse.json();
    const token= loginResponseJson.token;
    console.log(token)
    return token;
}
async createOrder(orderPayload)
{
    let responseData ={}
    responseData.token= await this.getToken()
    const orderResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                            {
                                data:orderPayload,
                                    headers:{
                                        'Authorization': responseData.token,
                                        'Content-Type': 'application/json',
                                            }
                            })
    
    const orderResponseJson= await orderResponse.json();
    console.log(orderResponseJson);
    const orderId= orderResponseJson.orders[0];
    responseData.orderId= orderId;
    return responseData;
}
}