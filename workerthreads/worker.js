const { parentPort, workerData } = require('worker_threads');

// Example CPU-intensive task: calculating factorial
function factorial(n) {
  return n === 0 ? 1 : n * factorial(n - 1);
}

const result = factorial(workerData);
parentPort.postMessage(result);
