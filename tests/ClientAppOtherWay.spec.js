import { test, expect } from '@playwright/test';

test('Page Playwright Test', async ({page})=>{
    const email= page.getByPlaceholder("email@example.com");
    const emailValue= 'poornima6723@gmail.com';
    const password= page.getByPlaceholder("enter your passsword");
    const passwordValue= 'Nethra10!';
    const login= page.getByRole('button', { name: 'Login' });
    const cartTitles= page.locator('.card-body b')
    const products= page.locator('.card-body');
    const expectedProductName= 'ZARA COAT 3';
    const cartButton = page.getByRole('listitem').getByRole('button', { name: 'Cart' });
    const cartInfo= page.locator('div li');
    const checkoutBtn= page.getByRole('listitem').getByRole('button', { name: 'Checkout' }); 
    const nameOnCard= page.locator('div.field').filter({ hasText:"Name on Card" }).locator("input");
    const cvvcode= page.locator('div.field').filter({ hasText:"CVV Code"}).locator("input");
    const country= page.getByPlaceholder("Select Country"); 
    const options= page.locator('.ta-results')
    const expectedOption= 'India';
    const placeOrderBtn= page.getByText("PLACE ORDER"); 
    const thankYouValue=  "Thankyou for the order.";
    const orderId= page.locator('.em-spacer-1 .ng-star-inserted');
    const ordersTab= page.getByRole('listitem').getByRole('button', { name: 'Orders' }); 
    const tableRows= page.locator('tbody tr');
    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await email.fill(emailValue);
    await password.fill(passwordValue);
    await login.click();
    await cartTitles.first().waitFor();
    
    await products.filter({hasText: expectedProductName})
    .getByRole('button',{name:'Add To Cart'}).click();

    await cartButton.click();
    await cartInfo.first().waitFor();
    await expect(page.getByText(expectedProductName)).toBeVisible();

    await checkoutBtn.click();
    await nameOnCard.fill("Poornima");
    await cvvcode.fill("123");
    await country.pressSequentially('Ind',{delay:150});
    await options.waitFor();
    await page.getByRole('button', { name: 'India' }).nth(1).click();

    await placeOrderBtn.click();

    await expect(page.getByText(thankYouValue)).toBeVisible();

    const orderIdValue= await orderId.textContent();
    const expectedOrderId = orderIdValue?.trim().replace(/\|/g, '').trim();

    console.log("Expected Order ID:", expectedOrderId);

    await ordersTab.click();
    
    await tableRows.first().waitFor();

    await tableRows.filter({hasText: expectedOrderId})
    .getByRole('button',{name:'View'}).click();

    await expect(page.getByText(expectedOrderId)).toBeVisible();
    const emailCountryDetails= page.locator('.text');
    await expect(emailCountryDetails.first()).toHaveText(emailValue);
    await expect(emailCountryDetails.nth(1)).toContainText(expectedOption);
    await expect(page.getByText(expectedProductName)).toBeVisible();

})