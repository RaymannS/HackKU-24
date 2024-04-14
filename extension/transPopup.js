document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['selectedText'], async (result) => {
        const selectedText = result.selectedText || 'No text selected';
        const popupContent = document.getElementById('popupContent');
        popupContent.textContent = selectedText;
        try {
            const response = await fetch('http://localhost:3000/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ selectedText })
            });

            if (response.ok) {
                const data = await response.json();
                const translatedText = data.translatedText;

                const transContent = document.getElementById('translation');
                transContent.textContent = translatedText;
            } else {
                console.error('Translation request failed');
            }
        } catch (error) {
            console.error('Error:', error);
            transContent.textContent = error;
        }
    });
});
