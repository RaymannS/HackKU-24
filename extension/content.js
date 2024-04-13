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
  
