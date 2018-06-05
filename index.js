const v8 = require('v8');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

v8.setFlagsFromString('max_old_space_size=4096 max_new_space_size=2048');

if (cluster.isMaster) {
  const workers = Array(numCPUs);
  setInterval(() => {
    if (global.gc) {
      console.log('Garbage collecting..');
      global.gc();
    } else {
      console.log('Garbage collection unavailable. Use --expose-gc');
    }
  }, 30000);
  console.log(`Master ${process.pid} is running`);
  for (let index = 1; index <= numCPUs; index++) {
    cluster.fork();
  }
  cluster.on('online', (worker) => {
    console.log(`worker ${worker.process.pid} connected.`);
  });
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died.`);
    cluster.fork();
  });
} else {
  const WebSocketServer = require('uws').Server;
  const wss = new WebSocketServer({ port: 80 });
  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      console.log('Received: ' + message);
      ws.send(`Reply from ${process.pid}`);
    });
    ws.send(`Welcome from ${process.pid}`);
  });
}
