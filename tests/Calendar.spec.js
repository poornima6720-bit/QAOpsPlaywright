import {test,expect} from '@playwright/test';

// test('Calendar Validations 1', async({page})=>
// {
// let monthNumber= "6"
// let date= "15";
// let year= "2027";
// const calendarSelector= page.locator(".react-date-picker__inputGroup")
// const yearValues= page.locator(".react-calendar__decade-view__years__year");
// const monthValues= page.locator(".react-calendar__year-view__months__month");
// const dateValues= page.locator(".react-calendar__month-view__days__day");

// await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
// await calendarSelector.click();
// await page.pause();
// await page.locator(".react-calendar__navigation__label").click();
// await page.locator(".react-calendar__navigation__label").click();
// await yearValues.filter({hasText: year}).click();
// await monthValues.nth(Number(monthNumber) - 1).click();
// await dateValues.filter({hasText: date}).click();
// await expect(page.locator('.react-date-picker__inputGroup__month')).toHaveValue(monthNumber);
// await expect(page.locator('.react-date-picker__inputGroup__day')).toHaveValue(date);
// await expect(page.locator('.react-date-picker__inputGroup__year')).toHaveValue(year);
// })

test('@Web Calendar Validations 2', async({page})=>
{
let monthNumber= "6";
let date= "15";
let year= "2027";
const expectedList=[monthNumber,date,year]
const calendarSelector= page.locator(".react-date-picker__inputGroup")
const monthValues= page.locator(".react-calendar__year-view__months__month");

await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
await calendarSelector.click();
await page.locator(".react-calendar__navigation__label").click();
await page.locator(".react-calendar__navigation__label").click();
await page.getByText(year).click();
await monthValues.nth(Number(monthNumber)-1).click();
await page.locator(`//abbr[text()='${date}']`).click();

const values= page.locator(".react-date-picker__inputGroup [type='number']");
for(let i=0; i<expectedList.length; i++)
{
    const val=await values.nth(i).inputValue();
    expect(val).toEqual(expectedList[i]);
}

})

//calendar test in poornima_fix branch