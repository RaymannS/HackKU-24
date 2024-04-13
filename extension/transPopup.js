document.addEventListener('DOMContentLoaded', () => {
    // Retrieve selected text from background page using chrome.storage
    chrome.storage.local.get(['selectedText'], (result) => {
        const selectedText = result.selectedText || 'No text selected';

        // Update popupContent with the selected text
        const popupContent = document.getElementById('popupContent');
        popupContent.textContent = selectedText;

        // Optionally, you can perform translation logic here
        // Example: Call translateText function to translate selectedText
        // translateText(selectedText);
    });
});
