// background.js
// Creates a context menu whenever you select text and right click it
chrome.contextMenus.create({
    id: "translateText",
    title: "Translate Slang",
    contexts: ["selection"]
});

// When context menu is cicked do this
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "translateText") {
    // Change the selectedText var. into the highlighted text
    const selectedText = info.selectionText;
    // Store the selected text in chrome.storage.local
    chrome.storage.local.set({ selectedText: selectedText }, () => {
        if (chrome.runtime.lastError) {
            console.error('Error storing selectedText:', chrome.runtime.lastError.message);
        } else {
            console.log('Selected text stored in local storage:', selectedText);
        }
    });
    // Create new popup with translation
    chrome.windows.create({
        type: "popup",
        url: "translation.html",
        width: 450,
        height: 250
    });
}
});

