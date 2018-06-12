import FugitiveWorker from '../core/FugitiveWorker';

export const Serializer = ({ debug }) => {
  let Serialize = new FugitiveWorker({
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
  let Deserialize = new FugitiveWorker({
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
