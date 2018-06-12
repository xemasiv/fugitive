import serialize from 'serialize-javascript';

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

export default FugitiveWorker;
