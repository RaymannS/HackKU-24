<<<<<<< HEAD
// content.js
// 
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "translate") {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        chrome.runtime.sendMessage({ action: "translateText", text: selectedText });
      }
    }
  });
  
=======
var contextMenuItem = {
    "id": "translateSlang",
    "title": "Translate Slang",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuitem);
>>>>>>> b2bb944218b4345aaff6846c5d0bc6630485655d
