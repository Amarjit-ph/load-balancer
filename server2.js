// server2.js
const http = require('http');
const { formatDate } = require('./dateUtils');

const port = 3002;
const server = http.createServer((req, res) => {
  const now = formatDate(new Date());
  const clientAddress = req.socket.remoteAddress || 'unknown';
  console.log(`[Server 2] ${now} - Received ${req.method} request from ${clientAddress}`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Server 2\n');
});

server.listen(port, () => {
  console.log(`[Server 2] Listening on port ${port}`);
});
