chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>{
    if(message.action === "doSomething") {
        console.log("Selected text:", message.selectedText)
    }
});