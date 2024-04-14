// transPopup.js
// When HTML is done loading do this
document.addEventListener('DOMContentLoaded', () => {
    // Get 'selectedText' from local storage
    chrome.storage.local.get(['selectedText'], async (result) => {
        const selectedText = result.selectedText || 'No text selected';
        // Set the popupContent data to the highlighted text in translation.html
        const popupContent = document.getElementById('popupContent');
        popupContent.textContent = selectedText;
        // POST to localhost server to run puppeteer on selectedText
        try {
            const response = await fetch('http://10.104.11.197:3000/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ selectedText })
            });
            // If response then yippee output translatedText
            if (response.ok) {
                const data = await response.json();
                const translatedText = data.translatedText;

                const transContent = document.getElementById('translation');
                transContent.textContent = translatedText;
            } else {
                console.error('Translation request failed');
            }
            // ew yucky error blewph
        } catch (error) {
            console.error('Error:', error);
            transContent.textContent = error;
        }
    });
});
