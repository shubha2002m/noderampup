let counter = 0;

const interval = setInterval(() => {
  counter++;
  parentPort.postMessage(counter); // Send updated counter back to main thread

  // Stop after sending 5
  if (counter === 5) {
    clearInterval(interval);
    parentPort.postMessage('Completed!'); // Send final message
  }
}, 1000);