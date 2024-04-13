//const puppeteer = require('puppeteer-extra');
//const StealthPlugin = require('puppeteer-extra-plugin-stealth');
//puppeteer.use(StealthPlugin());

// background.js
chrome.contextMenus.create({
    id: "translateText",
    title: "Translate with ChatGPT",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "translateText") {
      chrome.windows.create({
          type: "popup",
          url: "translation.html",
          width: 450,
          height: 250
      });
  }
});

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'runPuppeteer') {
      const selectedText = request.selectedText;

      // Launch Puppeteer and perform operations
      runPuppeteer(selectedText)
          .then((translation) => {
              sendResponse({ translation });
          })
          .catch((error) => {
              sendResponse({ error: error.message });
          });

      // Return true to indicate that sendResponse will be called asynchronously
      return true;
  }
});

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