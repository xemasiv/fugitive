import serialize from 'serialize-javascript';
import fastqueue from 'fastqueue';

class FugitiveWorker {
  constructor (opts) {
    const { path, method, imports, setup, debug, label, handler } = opts;
    const worker = new Worker(path);
    worker.postMessage({
      imports, label, debug,
      setup: serialize(setup),
      method: serialize(method)
    });
    const handlers = new fastqueue();
    worker.onmessage = ({ data }) => {
      let handler = handlers.shift();
      if (typeof handler === 'function') handler(data);
    };
    this.handlers = handlers;
    this.worker = worker;
  }
  send (message, handler) {
    this.handlers.push(handler ? handler : undefined);
    this.worker.postMessage(message);
  }
}

export default FugitiveWorker;
