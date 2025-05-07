const fs = require('fs');

const readable = fs.createReadStream('nonexistent.txt');

readable.on('data', chunk => {
  console.log('Should not happen');
});

readable.on('error', err => {
  console.error('shubha Caught error:', err.message);
});
