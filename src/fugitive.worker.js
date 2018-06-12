import _debug from 'debug';

let initialized = false;
let _method;
let d = () => {};

self.addEventListener('message', ({ data }) => {
  if (initialized === true) {
    d('calling method..');
    _method(self.postMessage.bind(self), data);
    d('method success');
  } else {
    if (typeof data === 'object') {
      try {
        const { method, imports, setup, debug, label } = data;
        if (debug) {
          d = _debug('F:W:'.concat(label));
          d.enabled = true;
        }
        d(data);
        if (imports) {
          d('importing scripts..');
          imports.map((script) => importScripts(script));
          d('imports ok');
        }
        d('running setup..');
        let _setup = eval('(' + setup +')');
        typeof _setup === 'function' ? _setup() : null;
        d('setup ok');
        d('registering method..');
        _method = eval('(' + method +')');
        d('method ok');
        d('initialize ok');
      } catch (e) {
        console.warn('fugitive worker @ initialization error', e.stack);
      }
      initialized = true;
    } else {
      console.error('fugitive worker @ expecting object, received', data);
    }
  }
});
