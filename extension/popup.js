document.addEventListener('DOMContentLoaded', () => {
  const translatedResultDiv = document.getElementById('translatedResult');

  // Retrieve translated text from local storage
  console.log("popup.js ran");
  chrome.storage.local.get(['translatedText'], (result) => {
      const translatedText = result.translatedText || 'Yiipe Translation not available';
      translatedResultDiv.textContent = translatedText;
  });
});
