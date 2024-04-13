chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>{
    if(message.action === "doSomething") {
        console.log("Selected text:", message.selectedText)
    }

});

var contextMenuItem = {
    "id": "translateSlang",
    "title": "You selected \"%s\"",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuitem);


