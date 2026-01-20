chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { action: "togglePanel" });
});

chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            if (command === "toggle-panel") {
                chrome.tabs.sendMessage(tabs[0].id, { action: "togglePanel" });
            } else if (command === "font-size-up") {
                chrome.tabs.sendMessage(tabs[0].id, { action: "fontSizeUp" });
            } else if (command === "font-size-down") {
                chrome.tabs.sendMessage(tabs[0].id, { action: "fontSizeDown" });
            }
        }
    });
});
