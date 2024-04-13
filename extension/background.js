// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "translateText") {
      const textToTranslate = message.text;
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

