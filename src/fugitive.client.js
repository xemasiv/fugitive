import pako from 'pako';
import msgpack5 from 'msgpack5';
import SimplePeer from 'simple-peer';
// import Peer from 'simple-peer';
// import mitt from 'mitt';
// import createStore from 'unistore';
import { sha224 } from 'js-sha256';
// import md5 from 'js-md5';
// import PouchDB from 'pouchdb-browser';
import debug from 'debug';
import QuickLRU from 'quick-lru';

import { fetch, AbortController } from 'yetch';

const lru = new QuickLRU({maxSize: 100});

const log = debug('client');
log.enabled = true;

const msgpack = msgpack5();

class FugitiveClient {
  constructor () {
    const self = this;

    const target_rtc_count = 1;

    self.on = on;
    self.emit = emit;
    self.off = off;

    const rtcs = [];

    let ws = new WebSocket('ws://127.0.0.1/');
    ws.binaryType = "arraybuffer";
    let send = (m) => ws.send(msgpack.encode(m));

    ws.onopen = () => {
      self.ws = ws;
      log('connected');
      if (rtcs.length < target_rtc_count) {
        send({ status: 'seeking' });
      }
    };
    let rtc;
    ws.onmessage = ({ data: m }) => {
      const { status, offer, answer } = msgpack.decode(m);
      log('received:', status);
      switch (status) {
        case 'welcome':
          log('welcomed by server');
          break;
        case 'awaiting_offer':
          log('awaiting offer..');
          break;
        case 'creating_offer':
          rtc = new SimplePeer({
            initiator: true,
            trickle: true
          });
          rtc.on('signal', (offer) => {
            send({
              status: 'sending_offer',
              offer
            });
          });
          rtc.on('connect', () => {
            log('alice connected');
          });
          break;
        case 'receiving_offer':
          rtc = new SimplePeer({
            initiator: false,
            trickle: true
          });
          rtc.signal(offer);
          rtc.on('signal', (answer) => {
            send({
              status: 'sending_answer',
              answer
            });
          });
          rtc.on('connect', () => {
            log('bob connected');
          });
          break;
        case 'receiving_answer':
          rtc.signal(answer);
          break;
        default:
          log('unhandled:', status);
          break;
      }
    };
    ws.onclose = () => {
      self.ws = undefined;
    };
    ws.onerror = console.error;
  }
  fetch (url, opts = {}) {
    
  }
}

const Client = new FugitiveClient();
window.Client = Client;
