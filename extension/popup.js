document.addEventListener('DOMContentLoaded', () => {
  const translatedResultDiv = document.getElementById('translatedResult');

  // Retrieve translated text from local storage
  chrome.storage.local.get(['translatedText'], (result) => {
      const translatedText = result.translatedText || 'Translation not available';
      translatedResultDiv.textContent = translatedText;
  });
});
