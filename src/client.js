/*

Requires:
  - mitt@mitt
  - Peer@simple-peer
  - createStore@unistore
*/
import mitt from 'mitt';
import Peer from 'simple-peer';
import createStore from 'unistore';
import Centaurus from './centaurus.js';

var Client = class FugitiveClient {
  constructor () {
    this.websockets = [];
    this.peers = [];
    this.middlewares = [];
  }
  websocket (url) {
    const websocket = new WebSocket(url);
    this.websockets.push(websocket);
    return websocket;
  }
  peer (opts) {
    const peer = new Peer(opts);
    this.peers.push(peer);
    return peer;
  }
  registerMiddleware (middleware) {
    this.middlewares.push(middleware);
  }
}
var Middleware = class FugitiveMiddleware {
  constructor (parameters) {
    const { onSend, onReceive } = parameters;
    this.onSend = onSend;
    this.onReceive = onReceive;
  }
}

let C = new Centaurus('/centaurus.worker.js');
C.loadScripts('https://unpkg.com/pako@1.0.6/dist/pako.min.js');
C.registerFunctions({
  test: (resolve, reject) => {
    console.log('function test executed');
    resolve(123456);
  },
  checkPako: (resolve, reject, param1, param2) => {
    console.log(pako);
    var result = ''.concat(param1, ' ', param2);
    resolve(result);
  }
});
window.C = C;
setTimeout(() => {

  C.test()
    .then(console.log)
    .catch(console.error);
  C.checkPako('is pako found?', 'yes!')
    .then(console.log)
    .catch(console.error);

}, 2000);
