import {test,expect} from '@playwright/test';

async function login(page, email, password) {
    const emailLoc= page.getByPlaceholder("you@email.com");
    const passswordLoc= page.getByLabel('Password');
    const signIn= page.locator('#login-btn');

    await page.goto("https://eventhub.rahulshettyacademy.com");
    await emailLoc.fill(email);
    await passswordLoc.fill(password);
    await signIn.click();
    await page.waitForURL('https://eventhub.rahulshettyacademy.com/');
    
}
test('Assignment',async({page})=>
{
    await login(page, "ms.poornima67@gmail.com", "Nethra10!");
    const browseLink = page.getByRole('link', { name: 'Browse Events →' });
    await expect(browseLink).toBeVisible();
    
    const admin= page.getByRole('button',{name:"Admin"});
    await admin.click();

    const manageEvents= page.locator('div>a[href="/admin/events"]');
    await manageEvents.click();

    const eventTitle= page.locator('#event-title-input');
    const title= `Test Event ${Date.now()}`;
    await eventTitle.fill(title);
    await page.pause();
})