chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>{
    if(message.action === "doSomething") {
        console.log("Selected text:", message.selectedText)
    }
});

var contextMenuItem = {
    "id": "translateSlang",
    "title": "Translate Slang",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuitem);
