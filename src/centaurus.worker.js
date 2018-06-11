import serialize from 'serialize-javascript';

const ActionTypes = {
  LOAD_SCRIPTS: 0,
  REGISTER_FUNCTIONS: 1,
  CALL_FUNCTION: 2
};
const LocalFunctions = {};

self.addEventListener('message', ({ data }) => {
  data = eval('(' + data + ')');
  switch (data.action) {
    case ActionTypes.LOAD_SCRIPTS:
      data.scripts.map((script) => importScripts(script));
      break;
    case ActionTypes.REGISTER_FUNCTIONS:
      LocalFunctions[data.key] = data.fn;
      break;
    case ActionTypes.CALL_FUNCTION:
      let resolve = (parameter) => postMessage(serialize({
        id: data.id,
        resolved: true,
        parameter
      }));
      let reject = (parameter) => postMessage(serialize({
        id: data.id,
        parameter
      }));
      LocalFunctions[data.key].apply(self, [ resolve, reject, ...data.parameters ]);
      break;
    default:
      console.warn('unhandled message', data);
      break;
  }
});
