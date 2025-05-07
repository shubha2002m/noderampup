const fs = require('fs');

const readable = fs.createReadStream('testfile.txt', { encoding: 'utf8' });

readable.on('data', chunk => {
  console.log('Received chunk:', chunk);
});

readable.on('end', () => {
  console.log('No more data.');
});

readable.on('error', err => {
  console.error('Stream error:', err);
});
