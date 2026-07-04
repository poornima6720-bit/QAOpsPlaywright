import { test, expect } from '@playwright/test'

test('Security test request intercept', async ({ page }) => {
    const email = page.locator('#userEmail');
    const emailValue = 'poornima6723@gmail.com';
    const password = page.locator('#userPassword');
    const passwordValue = 'Nethra10!';
    const login = page.getByRole('button', { name: 'Login' });
    const cartTitles = page.locator('.card-body b')
    const ordersTab= page.locator("button[routerlink='/dashboard/myorders']");

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await email.fill(emailValue);
    await password.fill(passwordValue);
    await login.click();
    await cartTitles.first().waitFor();
    await ordersTab.click();

    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=12345"})
    )
    
    await page.locator("button:has-text('View')").first().click();
    //await page.pause();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order")
})