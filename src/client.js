/*

Requires:
  - mitt@mitt
  - Peer@simple-peer
  - createStore@unistore
*/
import mitt from 'mitt';
import Peer from 'simple-peer';
import createStore from 'unistore';

import { sha256, sha224 } from 'js-sha256';
import md5 from 'js-md5';


import PouchDB from 'pouchdb-browser';
PouchDB.debug.disable();

var Database = class FugitiveDatabase {
  constructor () {
    this.db = new PouchDB({
      name: 'fugitive',
      adapter: 'idb',
      storage: 'persistent'
    });
  }
  write (doc) {
    return this.db.get(doc._id)
      .then((existing) => {
        doc._rev = existing._rev;
        return this.db.put(doc);
      })
      .catch((err) => {
        return err.status === 409 ? this.write(doc) : this.db.put(doc);
      });
  }
  read (id) {
    return this.db.get(id);
  }
};

var doc = {
  _id: 'test',
  name: 'xemasiv'
};

const db = new Database();

Promise.resolve()
  .then(() => db.write(doc))
  .then(() => db.read('test'))
  .then((result) => console.log('fetched:', result))
  .catch(console.error);

const str = '123';
console.log(md5(str));
console.log(sha256(str));

const benchmark = (label, fn) => {
  var now = Date.now();
  var y = 0;
  while (Date.now() - now < 1000) {
    fn();
  	y++;
  }
  console.log(label, ':', String(y), '/s');
}
/*
benchmark('md5', () => md5(str));
benchmark('sha256', () => sha256(str));
benchmark('sha224', () => sha224(str));
*/

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
console.log(ApproximateDistance([14.5818, 120.9770], [14.5943, 120.9706], 'meters'));
