chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes("*://stackoverflow.com/*")) {
        chrome.action.setPopup({
            tabId: tabId,
            popup: "popup/popup.html"
        });
    } else {
        chrome.action.setPopup({
            tabId: tabId,
            popup: ""
        });
    }
});
