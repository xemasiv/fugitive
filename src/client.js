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
  bindPlugin () {

  }
}
var Middleware = class FugitiveMiddleware {
  constructor (parameters) {
    const { onSend, onReceive } = parameters;
    this.onSend = onSend;
    this.onReceive = onReceive;
  }
}
var Plugin = class FugitivePlugin {
  constructor () {

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


// @approximate-distance
// https://github.com/mapbox/cheap-ruler
var factors = {
    kilometers: 1,
    miles: 1000 / 1609.344,
    nauticalmiles: 1000 / 1852,
    meters: 1000,
    metres: 1000,
    yards: 1000 / 0.9144,
    feet: 1000 / 0.3048,
    inches: 1000 / 0.0254
};
var ApproximateDistance = (a, b, units) => {
  const lat = a[0];
  const m = units ? factors[units] : 1;
  const cos = Math.cos(lat * Math.PI / 180);
  const cos2 = 2 * cos * cos - 1;
  const cos3 = 2 * cos * cos2 - cos;
  const cos4 = 2 * cos * cos3 - cos2;
  const cos5 = 2 * cos * cos4 - cos3;
  const kx = m * (111.41513 * cos - 0.09455 * cos3 + 0.00012 * cos5);
  const ky = m * (111.13209 - 0.56605 * cos2 + 0.0012 * cos4);
  const dx = (a[0] - b[0]) * kx;
  const dy = (a[1] - b[1]) * ky;
  return Math.sqrt(dx * dx + dy * dy);
};
ApproximateDistance([14.5818, 120.9770], [14.5943, 120.9706], 'meters');
