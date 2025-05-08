const { Worker } = require('worker_threads');

function runWorker(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', { workerData });

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

// function runCounterWorker() {
//   return new Promise((resolve, reject) => {
//     const worker = new Worker('./counterworker.js'); // Start worker.js

//     worker.on('message', (msg) => {
//       console.log(`Received from worker: ${msg}`);
//       if (msg === 5) {
//         worker.terminate(); // Stop worker after it sends 5
//         resolve('Worker terminated');
//       }
//     });

async function run() {
  try {
    const result = await runWorker(5);
    // const res= await runCounterWorker();
    console.log(`Result from worker: ${result}`);
  } catch (err) {
    console.error(err);
  }
}

run();




// 1. 🧵 Workflow of the Code
// Let’s walk through the flow of the code you’ve shared step-by-step:

// Main Thread (main.js):

// The main thread starts by calling run(), which invokes the runWorker function.

// runWorker creates a new worker thread and sends a piece of data (workerData = 10), telling the worker to compute something (in this case, the factorial of 10).

// Worker Thread (worker.js):

// The worker thread receives the data through workerData and performs a CPU-bound task (in this case, computing the factorial of the number).

// The result of the computation is sent back to the main thread using parentPort.postMessage(result).

// Main Thread (main.js):

// The main thread waits for the worker to finish (via the await keyword).

// Once the worker sends a message with the result, the main thread logs it to the console.

// Key Events:
// Message: The worker sends back the result using parentPort.postMessage(), and the main thread listens for this message with .on('message', ...).

// Error: If an error occurs in the worker, the main thread catches it using .on('error', ...).

// Exit: If the worker exits unexpectedly (non-zero exit code), the main thread handles it with .on('exit', ...).