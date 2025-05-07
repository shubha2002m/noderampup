const fs = require('fs');

const writable = fs.createWriteStream('testfile.txt');

writable.write('Hello, ');
writable.write('World! Sshubha here');
writable.end(); // closes the stream

writable.on('finish', () => {
  console.log('All data written.');
});
