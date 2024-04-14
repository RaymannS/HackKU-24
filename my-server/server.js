// server.js
const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/translate', async (req, res) => {
    const selectedText = req.body.selectedText;

    try {
        const translatedText = await runPuppeteer(selectedText);
        res.send({ translatedText });
    } catch (error) {
        res.status(500).send({ error: 'Translation failed' });
    }
});

async function runPuppeteer(textInput) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("https://chat.openai.com/");
    await page.waitForSelector('#prompt-textarea');

    const input = `Very concisely, tell me only what ${textInput} means`;
    await page.type('#prompt-textarea', input);
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
