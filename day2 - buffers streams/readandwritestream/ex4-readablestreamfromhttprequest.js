const http = require('http');

http.createServer((req, res) => {
  req.on('data', chunk => {
    console.log('Received body data:', chunk);
  });

  req.on('end', () => {
    res.end('Data received');
  });
}).listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
