// Class
var EClient = class ExpediteClient {
  constructor ({ url, open, message, close, error, debug }) {
    let backoff = 250;
    const init = () => {
      if (debug) debug(this.socket ? 'Reconnecting..' : 'Starting..');
      const socket = new WebSocket(url);
      // Built-ins:
      socket.addEventListener('open', () => {
        backoff = 250;
        if (debug) debug(`Connected; Backoff reset.`);
      });
      socket.addEventListener('close', () => {
        backoff = backoff >= 8000 ? 500 : backoff * 2;
        if (debug) debug(`Backoff set to ${backoff} ms.`);
        setTimeout(init, backoff);
      });
      // Instance-specific:
      if (open) socket.addEventListener('open', open);
      if (message) socket.addEventListener('message', message);
      if (close) socket.addEventListener('close', close);
      if (error) socket.addEventListener('error', error);
      this.socket = socket;
    };
    if (!url) {
      throw new Error('ExpediteClient missing url argument.');
    } else {
      init();
    }
  }
}

// Usage:
var instance = new EClient({
  url: 'ws://127.0.0.1',
  message: (e) => console.log(e.data),
  debug: console.warn
});
