// background.js
chrome.contextMenus.create({
    id: "translateText",
    title: "Translate with ChatGPT",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "translateText") {
      chrome.windows.create({
          type: "popup",
          url: "translation.html",
          width: 300,
          height: 200
      });
  }
});
