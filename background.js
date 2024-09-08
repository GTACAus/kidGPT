chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'openOrSwitchToGlitchTab') {
        chrome.tabs.query({ url: "*://*.glitch.com/*" }, function(tabs) {
            if (tabs.length > 0) {
                // If a glitch.com tab is found, switch to it
                chrome.tabs.update(tabs[0].id, { active: true });
            } else {
                // If no glitch.com tab is found, open a new one
                chrome.tabs.create({ url: 'https://glitch.com/edit/#!/remix/honorable-fast-lentil?path=index.html%3A139%3A0' });
            }
        });
    } else if (message.action === 'openOrSwitchToGPTTab') {
        // Combine both ChatGPT URLs into a single query
        chrome.tabs.query({ 
            url: ["*://*.chat.openai.com/*", "*://*.chatgpt.com/*"]
        }, function(tabs) {
            if (tabs.length > 0) {
                // If a ChatGPT tab is found, switch to it
                chrome.tabs.update(tabs[0].id, { active: true });
            } else {
                // If no ChatGPT tab is found, open a new one
                chrome.tabs.create({ url: 'https://chat.openai.com' });
            }
        });
    }
});
