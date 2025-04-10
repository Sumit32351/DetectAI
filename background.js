ECHO is on.
// background.js

// Global queue to collect texts from content scripts for batching.
let messageQueue = [];

// Configuration: Adjust BATCH_INTERVAL or add batch size trigger as needed.
const BATCH_INTERVAL = 2000; // 2000ms (2 seconds)

// Function to process and send batched texts to the backend.
function processBatch() {
  if (messageQueue.length === 0) {
    return; // No messages to process.
  }
  
  // Create a copy of the current batch and then reset the queue.
  const batch = messageQueue.slice();
  messageQueue = [];
  
  // Prepare the payload for the backend API.
  const payload = { texts: batch };

  // Call the backend API (update URL as required).
  fetch('https://your-backend-api/endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(result => {
      // Handle the results from the ML model.
      // Depending on your extension’s design, 
      // you might broadcast these results to all tabs or target a specific tab.
      // For example, sending a message back to the content script:
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, { type: 'analysisResult', data: result });
        }
      });
    })
    .catch(error => {
      console.error('Error processing batch:', error);
    });
}

// Set up an interval to periodically process the batch.
setInterval(processBatch, BATCH_INTERVAL);

// Listen for messages from the content script.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Check for the specific type of message.
  if (message.type === 'analyzeText') {
    // Add the text extracted from the page to the batch.
    messageQueue.push(message.text);
    
    // Optionally, you could check if the queue reaches a certain size and process immediately.
  }
  
  // Return true if the response is asynchronous.
  return true;
});
