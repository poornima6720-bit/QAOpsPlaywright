import { test, expect } from '@playwright/test';
import { request } from 'node:http';

test('Browser Context Playwright test',async ({browser})=>
{
const context = await browser.newContext();
const page = await context.newPage();

await page.route('**/*.{jpg,png,jpeg}', route=>route.abort());

const userName = page.locator('#username');
const password = page.locator("[type='password']");
const signIn = page.locator("#signInBtn");
const cardTitles= page.locator('.card-title a');

page.on('request', request=> console.log(request.url()));
page.on('response', response=> console.log(response.url(),response.status()));

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await userName.fill("rahulshetty");
await password.fill("learning");
await page.locator(".checkmark").first().click();
await page.locator("#signInBtn").click();
const errorMsg= await page.locator("[style*='block']").textContent();
console.log(errorMsg);
await expect(errorMsg).toContain('Incorrect');
await userName.fill("rahulshettyacademy");
await password.fill("Learning@830$3mK2");
await signIn.click();
const name1 = await cardTitles.first().textContent();
console.log(name1);
const name2 = await cardTitles.nth(1).textContent();
console.log(name2);
const allTitles = await cardTitles.allTextContents();
console.log("All titles: "+allTitles);
});

test('UI Controls',async({page})=>
{
const userName = page.locator('#username');
const password = page.locator("[type='password']");
const signIn = page.locator("#signInBtn");
const dropdown= page.locator('select.form-control');
const radioBtn= page.locator('.checkmark');
const okayBtn= page.locator('#okayBtn');
const checkBox= page.locator('#terms')
const documentLink= page.locator("[href*='documents-request']");

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
await userName.fill("rahulshettyacademy");
await password.fill("Learning@830$3mK2");
await radioBtn.nth(1).click();
await okayBtn.click();
await expect(radioBtn.nth(1)).toBeChecked();
await dropdown.selectOption('Consultant');
await checkBox.click();
await expect(checkBox).toBeChecked();
await checkBox.uncheck();
const ischecked= await checkBox.isChecked();
expect(ischecked).toBeFalsy();
await expect(documentLink).toHaveAttribute("class","blinkingText");
await signIn.click();
})

test('Child windows handling', async({browser})=>
{
    const context= await browser.newContext();
    const page= await context.newPage();
    
    const userName = page.locator('#username');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink= page.locator("[href*='documents-request']");
    const [newPage]= await Promise.all(
        [context.waitForEvent('page'),
         documentLink.click(),])
    
    console.log("Child URL:", newPage.url());
    const text= await newPage.locator('.red').textContent();
    console.log(text);
    const arrayText= text.split('@');
    const domain= arrayText[1].split(' ')[0];
    console.log(domain);

    await userName.fill(domain);
    console.log(await userName.inputValue());

})