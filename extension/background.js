// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "translateText") {
      const textToTranslate = message.text;
      console.log("Text to translate:", textToTranslate);
      const apiKey = "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";
  
      fetch(`https://api.openai.com/v1/engines/text-davinci-003/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt: textToTranslate,
          max_tokens: 1
        })
      })
      .then(response => response.json())
      .then(data => {
        const translatedText = data.choices[0].text.trim();
        chrome.storage.local.set({ translatedText }); // Store translated text in local storage
      });
    }

});

chrome.contextMenus.create({
    "id": "translateSlang",
    "title": "You selected \"%s\"",
    "contexts": ["selection"],
});

chrome.contextMenus.onClicked.addListener(function(clickData) {
  if (clickData.menuItemId === "translateSlang" && clickData.selectionText) {
    // Save the selected text to be accessed by popup.js
    chrome.storage.local.set({ selectedText: clickData.selectionText });

    // Open the popup.html in a new window
    chrome.windows.create({
        url: chrome.runtime.getURL("translation.html"),
        type: "popup",
        width: 300, // Set width as needed
        height: 200, // Set height as needed
        focused: true,
        //setSelfAsOpener: true // Ensure the popup has access to extension resources
        state: "normal", // Ensure window state is normal (not minimized or maximized)
        //resizable: false, // Disable window resizing
        //frame: "none", // Hide window frame (including controls)
        //alwaysOnTop: true // Keep the window above other browser windows
    });
  } 
});

