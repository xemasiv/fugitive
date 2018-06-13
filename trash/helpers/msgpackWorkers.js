import DedicatedWorker from '../core/DedicatedWorker';

export const Serializer = ({ debug }) => {
  let Serialize = new DedicatedWorker({
    label: 'Serializer',
    path: '/fugitive.worker.min.js',
    imports: [ 'https://unpkg.com/msgpack5@4.2.0/dist/msgpack5.min.js' ],
    setup: () => {
      self.msgpack = msgpack5();
    },
    method: (resolve, parameter) => {
      resolve(
        msgpack.encode(parameter)
      );
    },
    debug
  });
  return Serialize.send.bind(Serialize);
};
export const Deserializer = ({ debug }) => {
  let Deserialize = new DedicatedWorker({
    label: 'Deserializer',
    path: '/fugitive.worker.min.js',
    imports: [ 'https://unpkg.com/msgpack5@4.2.0/dist/msgpack5.min.js' ],
    setup: () => {
      self.msgpack = msgpack5();
    },
    method: (resolve, parameter) => {
      resolve(
        msgpack.decode(parameter)
      );
    },
    debug
  });
  return Deserialize.send.bind(Deserialize);
};
