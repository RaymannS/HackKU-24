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

