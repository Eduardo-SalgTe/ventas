const http = require('http');

const port = 3000; 

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('¡Hola, mundo!');
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Escuchando en http://0.0.0.0:${port}/`);
});