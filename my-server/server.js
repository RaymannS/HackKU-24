// server.js
const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// Need these dependencies to run Pup. and Express. and CORS for security-bypass
puppeteer.use(StealthPlugin());

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
// Handle translate requests
app.post('/translate', async (req, res) => {
    const selectedText = req.body.selectedText;

    try {
        const translatedText = await runPuppeteer(selectedText);
        res.send({ translatedText });
    } catch (error) {
        res.status(500).send({ error: 'Translation failed' });
    }
});
// Run runPuppeteer script that sends a text response to chatGPT and then 
// scrapes the output as translatedText
async function runPuppeteer(textInput) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("https://chat.openai.com/");
    await page.waitForSelector('#prompt-textarea');

    // This input can be changed to the input prompt
    const input = `Concisely, only say what \'${textInput}\' means (nothing else); it relates to American slang, idioms, or emojis`;
    page.click('#prompt-textarea');
    page.keyboard.sendCharacter(input);
    await page.keyboard.press('Enter');

    await page.waitForSelector('.rounded-md');
    await new Promise(r => setTimeout(r, 1000));

    const messageOutput = await page.evaluate(() => {
        const elements = document.querySelectorAll('.markdown');
        return elements[0]?.textContent || 'Translation not available';
    });

    await browser.close();
    return messageOutput;
}

// Start server on localhost
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
