import { test, expect } from '@playwright/test';

test('Page Playwright Test', async ({page})=>{
    const registerHere= page.locator(".login-wrapper-footer-text");
    const firstName= page.locator('#firstName');
    const lastName= page.locator('#lastName');
    const email= page.locator('#userEmail');
    const phoneNumber= page.locator('#userMobile');
    const password= page.locator('#userPassword');
    const confirmPassword= page.locator('#confirmPassword');
    const checkbox= page.locator("[type='checkbox']");
    const registerBtn= page.locator('#login');
    const cartTitles= page.locator('.card-body b')
    const login= page.getByRole('button', { name: 'Login' });

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await registerHere.click();
    await firstName.fill("Poornima");
    await lastName.fill("Saravanan");
    await email.fill("poornima6723@gmail.com");
    await phoneNumber.fill("9998877665");
    await password.fill('Nethra10!');
    await confirmPassword.fill('Nethra10!');
    await checkbox.click();
    await registerBtn.click();
    await login.click();    
    await email.fill("poornima6723@gmail.com");
    await password.fill('Nethra10!');
    await registerBtn.click();
    await cartTitles.first().waitFor();
    console.log(await cartTitles.first().textContent());
})