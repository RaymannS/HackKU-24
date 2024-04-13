// background.js
chrome.contextMenus.create({
    "id": "translateSlang",
    "title": "Translate \"%s\"",
    "contexts": ["selection"],
});
chrome.contextMenus.onClicked.addListener(function(clickData) {
  if (clickData.menuItemId === "translateSlang" && clickData.selectionText) {
    // Save the selected text to be accessed by popup.js
    chrome.storage.local.set({ selectedText: clickData.selectionText });

    // Open the popup.html in a new window
    chrome.windows.create({
        url: chrome.runtime.getURL("translation.html"),
        type: "popup",
        width: 300, // Set width as needed
        height: 200, // Set height as needed
        focused: true,
        //setSelfAsOpener: true // Ensure the popup has access to extension resources
        state: "normal", // Ensure window state is normal (not minimized or maximized)
        //resizable: false, // Disable window resizing
        //frame: "none", // Hide window frame (including controls)
        //alwaysOnTop: true // Keep the window above other browser windows
    });
  } 
});

