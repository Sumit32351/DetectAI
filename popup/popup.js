document.addEventListener('DOMContentLoaded', function () {
    const analyzeBtn = document.getElementById('analyzeBtn');
    analyzeBtn.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => {
                    alert('Analyzing page for AI-generated content...');
                }
            });
        });
    });
});
