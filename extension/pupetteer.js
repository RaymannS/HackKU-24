const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');


puppeteer.use(StealthPlugin());

async function runPupetteer(textInput){
    const browser = await puppeteer.launch({ headless: true, timeout: 0});
        const page = await browser.newPage();

        await page.goto("https://chat.openai.com/")

        await page.waitForSelector('#prompt-textarea');

        input = "Very concicely, tell me only what " + textInput + "means"
        await page.type('#prompt-textarea', input);
        await page.keyboard.press('Enter');

        await page.waitForSelector('.rounded-md ')
        await new Promise(r => setTimeout(r, 0));

        // Extract data
        const messageOutput = await page.evaluate(() => {
        // Select the elements with the specified class name
        const elements = document.querySelectorAll('.markdown');
        
        // Extract the text content from each element and put it into an array
        const dataArray = [];
        elements.forEach(element => {
            dataArray.push(element.textContent);
        });
        
        return dataArray[0];
        });
    
        // Log the extracted data
        console.log(messageOutput);

        await browser.close();
    };

    module.exports = runPupetteer;