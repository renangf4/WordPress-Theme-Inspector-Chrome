document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs.length > 0) {
            chrome.scripting.executeScript(
                {
                    target: { tabId: tabs[0].id },
                    files: ['content.js']
                },
                () => {
                    if (chrome.runtime.lastError) {
                        document.getElementById('theme-name').textContent = 'Error injecting script: ' + chrome.runtime.lastError.message;
                    } else {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "getInfos" }, function(response) {
                            if (chrome.runtime.lastError) {
                                document.getElementById('theme-name').textContent = 'Error sending message: ' + chrome.runtime.lastError.message;
                            } else if (response && response.infos) {
                                document.getElementById('theme-name').innerHTML = response.infos;
                            } else {
                                document.getElementById('theme-name').textContent = 'Error displaying response.';
                            }
                        });
                    }
                }
            );
        } else {
            document.getElementById('theme-name').textContent = 'No active tab found.';
        }
    });
});
