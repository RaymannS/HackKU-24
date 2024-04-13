
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve selected text from background page using chrome.storage
    chrome.storage.local.get(['selectedText'], (result) => {
        const selectedText = result.selectedText || 'No text selected';

        // Update popupContent with the selected text
        const popupContent = document.getElementById('popupContent');
        popupContent.textContent = selectedText;
        chrome.runtime.sendMessage({ action: 'runPuppeteer', selectedText }, (response) => {
            if (response && response.translation) {
                const transContent = document.getElementById('translation');
                transContent.textContent = response.translation;
            } else if (response && response.error) {
                console.error('Puppeteer error:', response.error);
            }
        });

        
        // Optionally, you can perform translation logic here
        // Example: Call translateText function to translate selectedText
        // translateText(selectedText);
    });
});