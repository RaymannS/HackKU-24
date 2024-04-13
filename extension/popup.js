// popup.js
chrome.storage.local.get(['translatedText'], (result) => {
    const translatedResultDiv = document.getElementById('translatedResult');
    translatedResultDiv.textContent = result.translatedText || 'Translation not available';
  });
  