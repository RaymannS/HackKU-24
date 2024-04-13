chrome.contextMenus.create({
    id: "MyExtensionMenuItem",
    title: "My Extension Option",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((info, tab) =>{
    if(info.menuItemId === "myExtensionMenuItem"){
        chrome.runtime.sendMessage({action: "doSomething", selectedText: info.selectionText });
    }
});