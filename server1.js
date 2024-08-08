// server1.js
const http = require('http');
const { formatDate } = require('./dateUtils');

const port = 3001;
const server = http.createServer((req, res) => {
  const now = formatDate(new Date());
  const clientAddress = req.socket.remoteAddress || 'unknown';
  console.log(`[Server 1] ${now} - Received ${req.method} request from ${clientAddress}`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Server 1\n');
});

server.listen(port, () => {
  console.log(`[Server 1] Listening on port ${port}`);
});
