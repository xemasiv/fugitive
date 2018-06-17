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
// import 'webrtc-adapter/out/adapter.js';

import { blobToArrayBuffer } from 'blob-util'

import chunk from 'lodash.chunk';

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

    let handlers = new Map();
    self.handlers = handlers;


    let transferring = new Map();
    let temp = new Map();

    // http://2ality.com/2015/10/concatenating-typed-arrays.html
    const uint8concat = (resultConstructor, ...arrays) => {
      let totalLength = 0;
      for (let arr of arrays) {
        totalLength += arr.length;
      }
      let result = new resultConstructor(totalLength);
      let offset = 0;
      for (let arr of arrays) {
        result.set(arr, offset);
        offset += arr.length;
      }
      return result;
    }
    const resolver = (rtc) => (data) => {
      if (transferring.has(rtc) === true) {
        if (data.length > 1) {
          log('received chunk:', data);
          temp.set(
            rtc,
            uint8concat(Uint8Array, temp.get(rtc), data)
          );
        } else {
          let content = temp.get(rtc);
          log('all chunks:', content);
          let url = transferring.get(rtc);
          let handler = handlers.get(url);
          handler.abort();

          log('compressed:', content.byteLength);
          log('decompressed:', pako.inflate(content).byteLength);
          content = new Blob(
            [pako.inflate(content)],
            { type: handler.type }
          );
          log('content:', content);
          content = URL.createObjectURL(content);
          log('content:', content);
          handler.resolve(content);

          handlers.delete(url);

        }
      } else {
        let { action, url } = msgpack.decode(data);
        let handler, chunks, content;
        log('FROM PEER', action, url);
        switch (action) {
          case 'requesting':
            if (lru.has(url) === true) {
              content = lru.get(url);
              rtc.send(
                msgpack.encode({
                  action: 'transferring', url
                })
              );
              log('content is:', content);
              chunks = chunk(content, 16 * 1024);
              log('chunks are:', chunks);
              chunks.push(new Uint8Array([0]));
              chunks.map((chunk) => {
                log('sending chunk:', chunk);
                rtc.send(Uint8Array.from(chunk));
              });
            } else {
              rtc.send(
                msgpack.encode({
                  action: 'rejecting', url
                })
              );
            }
            break;
          case 'transferring':
            transferring.set(rtc, url);
            temp.set(rtc, new Uint8Array());
            break;
          case 'rejecting':
            if (handlers.has(url) === true) {
              handlers.delete(url);
            }
            break;
        }
      }
      return;
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
          log(Boolean(rtc));
          if (Boolean(rtc) === false) {
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
          }
          break;
        case 'receiving_offer':
          log(Boolean(rtc));
          if (Boolean(rtc) === false) {
            rtc = new SimplePeer();
            rtc.on('signal', (answer) => {
              send({
                status: 'sending_answer',
                answer
              });
            });
            rtc.on('connect', () => {
              log('bob connected');
              rtcs.push(rtc);
              log(rtc);
              // rtc.send('hello');
            });
            rtc.on('data', resolver(rtc));
            rtc.on('error', console.error);
          }
          rtc.signal(offer);
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
  blob (url, type, opts = {}) {
    const self = this;
    return new Promise((resolve, reject) => {
      let controller = new AbortController();
      opts.signal = controller.signal;
      self.handlers.set(url, {
        resolve: resolve,
        abort: controller.abort.bind(controller),
        type
      });
      self.send({ action: 'requesting', url });
      fetch(url, opts)
        .then((response) => {
          if (response.ok) return response.blob();
          throw new Error(
            'Network error in response.'
          );
        })
        .then((blob) => {
          log(blob);
          // let f = new FileReader();
          // f.readAsArrayBuffer(blob);
          // f.onloadend = () => {
          //   let h = sha224(f.result);
          // };
          blobToArrayBuffer(blob)
            .then((buffer) => {
              log('buffer:', buffer);
              self.lru.set(url,
                pako.deflate(new Uint8Array(buffer), {
                  level: 9,
                  memLevel: 9
                })
              );
            });
          let u = URL.createObjectURL(blob);
          self.handlers.delete(url);
          resolve(u);
        })
        .catch((ex) => {
          if (ex.name === 'AbortError') {
            log('request aborted')
          } else {
            reject(ex);
          }
        });
    });
  }
}

const Client = new FugitiveClient();
window.Client = Client;
window.msgpack = msgpack;
window.pako = pako;
