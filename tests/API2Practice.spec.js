import { test, expect } from '@playwright/test';

let webContext;
let emailValue;
let cartTitles;
test.beforeAll(async ({browser})=>
{
    const context= await browser.newContext();
    const page= await context.newPage();
    const email= page.locator('#userEmail');
     emailValue= 'poornima6723@gmail.com';
    const password= page.locator('#userPassword');
    const passwordValue= 'Nethra10!';
    const login= page.getByRole('button', { name: 'Login' });
     cartTitles= page.locator('.card-body b');

    await page.goto("https://rahulshettyacademy.com/client/");
    await email.fill(emailValue);
    await password.fill(passwordValue);
    await login.click();
    await cartTitles.first().waitFor();

    await context.storageState({path:'state2.json'});
    webContext= await browser.newContext({storageState: 'state2.json'})

})

test.skip('Page Playwright Test', async ({})=>{
    
    const page= await webContext.newPage();

    const products= page.locator('.card-body');
    const expectedProductName= 'ZARA COAT 3';
    const cartButton = page.locator("[routerlink='/dashboard/cart']");
    const cartInfo= page.locator('div li');
    const checkoutBtn= page.locator("text=Checkout");
    const nameOnCard= page.locator('div.field').filter({ hasText:"Name on Card" }).locator("input");
    const cvvcode= page.locator('div.field').filter({ hasText:"CVV Code"}).locator("input");
    const country= page.locator("[placeholder='Select Country']");
    const options= page.locator('.ta-results')
    const expectedOption= 'India';
    const optionValue= page.locator('.ta-results button');
    const emailLabel= page.locator('.user__name label');
    const placeOrderBtn= page.locator('.action__submit');
    const thankYouMsg = page.locator('.hero-primary');
    const thankYouValue=  " Thankyou for the order. ";
    const orderId= page.locator('.em-spacer-1 .ng-star-inserted');
    
    await page.goto("https://rahulshettyacademy.com/client/");
    console.log(await cartTitles.allTextContents());
    
    const count= await products.count();

    for(let i=0; i<count; i++)
    {
       const actualProductName= await products.nth(i).locator('b').textContent();
       if(actualProductName===expectedProductName)
       {
        await products.nth(i).locator('text= Add To Cart').click();
        break;
       }
    }
    await cartButton.click();

    await cartInfo.first().waitFor();
    await expect(page.locator(`h3:has-text("${expectedProductName}")`)).toBeVisible();
    //await expect(page.locator('h3').filter({ hasText: expectedProductName })).toBeVisible();

    await checkoutBtn.click();
    await nameOnCard.fill("Poornima");
    await cvvcode.fill("123");
    await country.pressSequentially('Ind',{delay:150});
    await options.waitFor();
    
    const optionCount= await optionValue.count();

    for(let i=0; i<optionCount; i++)
    {
        const actualValue= await optionValue.nth(i).textContent();
        if(actualValue?.trim()===expectedOption)
        {
            await optionValue.nth(i).click();
            console.log(actualValue);
            break;
        }
    }

    await expect(emailLabel).toHaveText(emailValue);
    await placeOrderBtn.click();
    await expect(thankYouMsg).toHaveText(thankYouValue);
    const orderIdValue= await orderId.textContent();
    console.log(orderIdValue);
    const expectedOrderId= orderIdValue.split(' ')[2];
    console.log(expectedOrderId)

    const ordersTab= page.locator("button[routerlink='/dashboard/myorders']");
    await ordersTab.click();

    const tableRows= page.locator('tbody tr');
    await tableRows.first().waitFor();
    const rowCount= await tableRows.count();
    for(let i=0; i< rowCount; i++)
    {
        const actualOrderId= await tableRows.nth(i).locator('th').textContent();
        if(actualOrderId.trim()===expectedOrderId)
        {
            await tableRows.nth(i).locator('button').first().click();
            break;
        }
    }

    const OrderIdDetails= page.locator('div .col-text');
    await expect(OrderIdDetails).toHaveText(expectedOrderId);
    const emailCountryDetails= page.locator('.text');
    await expect(emailCountryDetails.first()).toHaveText(emailValue);
    await expect(emailCountryDetails.nth(1)).toContainText(expectedOption);
    const productNameDetails= page.locator('.artwork-card-info .title');
    await expect(productNameDetails).toHaveText(expectedProductName);


})