const WebSocketServer = require('uws').Server;
const wss = new WebSocketServer({ port: 80 });
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('Received: ' + message);
    ws.send(`Reply from ${process.pid}`);
  });
  ws.send(`Welcome from ${process.pid}`);
});
console.log('listening on port 80');
