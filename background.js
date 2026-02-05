/**
 * ============================================================================
 *  YouTube Subtitle Pro
 *  Copyright (c) VoidKSA. All rights reserved.
 * ============================================================================
 *
 *  ðŸŒ Website:     https://voidksa.com
 *  âœ–ï¸ X (Twitter): https://x.com/voidksa2
 *  ðŸ™ GitHub:      https://github.com/voidksa
 *
 * ============================================================================
 *  âš ï¸ LEGAL NOTICE:
 *  This code is the intellectual property of VoidKSA.
 *  It is strictly PROHIBITED to remove, modify, or hide this copyright header.
 *  Redistribution or commercial use without permission is not allowed.
 * ============================================================================
 */
chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { action: "togglePanel" }).catch(() => {
        
    });
});

chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            if (command === "toggle-panel") {
                chrome.tabs.sendMessage(tabs[0].id, { action: "togglePanel" }).catch(() => {});
            } else if (command === "font-size-up") {
                chrome.tabs.sendMessage(tabs[0].id, { action: "fontSizeUp" }).catch(() => {});
            } else if (command === "font-size-down") {
                chrome.tabs.sendMessage(tabs[0].id, { action: "fontSizeDown" }).catch(() => {});
            }
        }
    });
});