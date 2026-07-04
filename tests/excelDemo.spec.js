import ExcelJs from 'exceljs';
import{test, expect} from '@playwright/test'

async function writeexcelTest(searchText,replaceText,change,filePath) {
   
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1');
    const output= await readExcel(worksheet,searchText);
    const cell=worksheet.getCell(output.row,output.column+change.columnChange);
    cell.value= replaceText;
    await workbook.xlsx.writeFile(filePath)
}


async function readExcel(worksheet,searchText)
{
     let output=
    {
        row: -1,
        column: -1
    }
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            {
                if(cell.value === searchText)
                {
                   output.row= rowNumber;
                   output.column= colNumber;           
                }
            }
        })
    })
    return output;
}

//writeexcelTest("Mango",350,{rowChange:0,columnChange:2},"C:/Users/mspoo/Downloads/download.xlsx")

test('Upload Download Excel Validation', async({page})=>
{
    const textSearch= 'Mango';
    const updateValue= '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    //const downloadPromise= page.waitForEvent('download');
    const [download]= await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('button', {name:"Download"}).click()
    ])
    const downloadedFilePath = "C:/Users/mspoo/Downloads/download.xlsx";
    await download.saveAs(downloadedFilePath);
    await writeexcelTest(textSearch,updateValue,{rowChange:0,columnChange:2},downloadedFilePath);
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles(downloadedFilePath);
    const textLocator= await page.getByText(textSearch);
    const desiredRow= await page.getByRole('row').filter({has: textLocator});
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
    await page.pause();

})