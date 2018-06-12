import serialize from 'serialize-javascript';

const debug = false;

class FugitiveWorker {
  constructor (opts) {
    const { path, method, imports, setup, debug, label, handler } = opts;
    const worker = new Worker(path);
    worker.postMessage({
      imports, label, debug,
      setup: serialize(setup),
      method: serialize(method)
    });
    const handlers = [];
    worker.onmessage = ({ data }) => {
      typeof handlers[0] === 'function' ? handlers.shift()(data) : handlers.shift();
    };
    this.handlers = handlers;
    this.worker = worker;
  }
  send (message, handler) {
    this.handlers.push(handler ? handler : undefined);
    this.worker.postMessage(message);
  }
}

let Compressor = new FugitiveWorker({
  label: 'Compressor',
  path: '/fugitive.worker.min.js',
  imports: [ 'https://unpkg.com/pako@1.0.6/dist/pako.min.js' ],
  method: (resolve, parameter) => {
    console.log('received:', parameter);
    resolve(
      pako.deflate(parameter, {
        level: 0,
        memLevel: 9
      })
    );
  },
  debug
});
let Decompressor = new FugitiveWorker({
  label: 'Decompressor',
  path: '/fugitive.worker.min.js',
  imports: [ 'https://unpkg.com/pako@1.0.6/dist/pako.min.js' ],
  method: (resolve, parameter) => {
    console.log('received:', parameter);
    resolve(
      pako.inflate(parameter)
    );
  },
  debug
});
Compressor.send(new Uint8Array(100), (compressed) => {
  console.log('compressed:', compressed);
  Decompressor.send(compressed, (decompressed) => {
    console.log('decompressed:', decompressed);
  });
});
