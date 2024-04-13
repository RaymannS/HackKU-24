<<<<<<< HEAD
// content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "translate") {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        chrome.runtime.sendMessage({ action: "translateText", text: selectedText });
      }
    }
  });
  
=======
>>>>>>> 2a6f9cebfcced159bcc37cf53f8e6b572e39360d
