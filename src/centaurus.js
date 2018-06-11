import serialize from 'serialize-javascript';

const ActionTypes = {
  LOAD_SCRIPTS: 0,
  REGISTER_FUNCTIONS: 1,
  CALL_FUNCTION: 2
};

// https://gist.github.com/jed/982883
const uuid = (a) => {return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g ,uuid)}

class Centaurus {
  constructor (workerPath) {
    const ResolveMap = new Map();
    const RejectMap = new Map();
    const worker = new Worker(workerPath);
    worker.onmessage = ({ data }) => {
      data = eval('(' + data + ')');
      if (data.id) {
        if (data.resolved === true) {
          ResolveMap.get(data.id)(data.parameter);
        } else {
          RejectMap.get(data.id)(data.parameter);
        }
        ResolveMap.delete(data.id);
        RejectMap.delete(data.id);
      }
    };
    this.worker = worker;
    this.send = (something, resolve, reject) => {
      if (typeof something !== 'object') throw new Error('asd');
      if (resolve) {
        const id = uuid();
        something.id = id;
        ResolveMap.set(id, resolve);
        RejectMap.set(id, reject);
      }
      this.worker.postMessage(serialize(something));
    };
  }
  loadScripts (...scripts) {
    this.send({
      action: ActionTypes.LOAD_SCRIPTS,
      scripts
    });
  }
  registerFunctions (functions) {
    Object.keys(functions).map((key) => {
      this.send({
        action: ActionTypes.REGISTER_FUNCTIONS,
        key: key,
        fn: functions[key]
      });
      this[key] = (...parameters) => {
        return new Promise((resolve, reject) => {
          this.send({
            action: ActionTypes.CALL_FUNCTION,
            key: key,
            parameters
          }, resolve, reject);
        });
      };
    });
  }
}

module.exports = Centaurus;
