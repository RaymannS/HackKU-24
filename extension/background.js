// background.js
chrome.contextMenus.create({
    id: "translateText",
    title: "Translate Slang",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "translateText") {
    const selectedText = info.selectionText;

    // Store the selected text in chrome.storage.local
    chrome.storage.local.set({ selectedText: selectedText }, () => {
        if (chrome.runtime.lastError) {
            console.error('Error storing selectedText:', chrome.runtime.lastError.message);
        } else {
            console.log('Selected text stored in local storage:', selectedText);
        }
    });
    
    chrome.windows.create({
        type: "popup",
        url: "translation.html",
        width: 450,
        height: 250
    });
}
});

