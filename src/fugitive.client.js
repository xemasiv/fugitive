import pako from 'pako';
import msgpack5 from 'msgpack5';
import SimplePeer from 'simple-peer';
import Peer from 'simple-peer';
import createStore from 'unistore';
import { sha224 } from 'js-sha256';
import md5 from 'js-md5';
import PouchDB from 'pouchdb-browser';

const debug = false;
const socket = new WebSocket('ws://127.0.0.1/');
