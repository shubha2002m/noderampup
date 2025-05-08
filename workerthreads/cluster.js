const cluster = require('cluster');
const http = require('http');
const os = require('os');

// Get the number of CPU cores on the machine
const numCPUs = os.cpus().length;

// If this process is the master process
if (cluster.isMaster) {
  console.log(`Master process started, spawning ${numCPUs} workers.`);

  // Fork worker processes
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // Creates a worker process for each CPU core
  }

  // Listen for worker process exit events
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // This is the worker process
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from worker process ' + cluster.worker.id);
  }).listen(8000, () => {
    console.log(`Worker ${cluster.worker.id} started and listening on port 8000`);
  });
}
