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


const log = debug('client');
log.enabled = true;

const msgpack = msgpack5();

class FugitiveClient {
  constructor () {
    const self = this;

    const lru = new QuickLRU({maxSize: 100});

    self.lru = lru;

    const target_rtc_count = 1;

    const rtcs = [];
    self.rtcs = rtcs;

    let ws = new WebSocket('ws://127.0.0.1/');
    ws.binaryType = "arraybuffer";

    let send = (m) => ws.send(msgpack.encode(m));
    self.send = ((m) => {
      log('multicasting', m);
      rtcs.map((rtc) => {
        log('unicasting', m);
        rtc.send(msgpack.encode(m));
      });
    });

    ws.onopen = () => {
      self.ws = ws;
      log('connected');
      if (rtcs.length < target_rtc_count) {
        send({ status: 'seeking' });
      }
    };
    let rtc;
    const resolver = (rtc) => (data) => {
      const { action, url, content } = msgpack.decode(data);
      log(action, url, content);
      switch (action) {
        case 'request':
          if (lru.has(url)) {
            content = lru.get(url);
            rtc.send(
              msgpack.encode({
                action: 'resolve', url, content
              })
            );
          }
          break;
        case 'resolve':
          break;
      }
    };
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
          rtc = new SimplePeer({ initiator: true });
          rtc.on('signal', (offer) => {
            send({
              status: 'sending_offer',
              offer
            });
          });
          rtc.on('connect', () => {
            log('alice connected');
            rtcs.push(rtc);
            rtc.send('hello');
          });
          rtc.on('data', resolver(rtc));
          rtc.on('error', console.error);
          break;
        case 'receiving_offer':
          rtc = new SimplePeer();
          rtc.signal(offer);
          rtc.on('signal', (answer) => {
            send({
              status: 'sending_answer',
              answer
            });
          });
          rtc.on('connect', () => {
            log('bob connected');
            rtcs.push(rtc);
            rtc.send('hello');
          });
          rtc.on('data', resolver(rtc));
          rtc.on('error', console.error);
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
  blob (url, opts = {}) {
    const self = this;
    return new Promise((resolve, reject) => {
      let controller = new AbortController();
      opts.signal = controller.signal;
      self.send({ action: 'request', url });
      fetch(url, opts)
        .then((response) => {
          if (response.ok) return response.blob();
          throw new Error(
            'Network error in response.'
          );
        })
        .then((blob) => {
          // let f = new FileReader();
          // f.readAsArrayBuffer(blob);
          // f.onloadend = () => {
          //   let h = sha224(f.result);
          //   self.lru.set(h, blob);
          // };
          self.lru.set(url, blob);
          let u = URL.createObjectURL(blob);
          resolve(u);
        })
        .catch((ex) => {
          if (ex.name === 'AbortError') {
            log('request aborted')
          }
          // reject(ex);
        });
    });
  }
}

const Client = new FugitiveClient();
window.Client = Client;
window.msgpack = msgpack;
