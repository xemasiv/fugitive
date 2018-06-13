import DedicatedWorker from '../core/DedicatedWorker';

export const Compressor = ({ level, memLevel, debug }) => {
  let Compress = new DedicatedWorker({
    label: 'Compressor',
    path: '/fugitive.worker.min.js',
    imports: [ 'https://unpkg.com/pako@1.0.6/dist/pako.min.js' ],
    method: (resolve, parameter) => {
      resolve(
        pako.deflate(parameter, {
          level: typeof level === 'number' ? level : 9,
          memLevel: typeof memLevel === 'number' ? memLevel : 9
        })
      );
    },
    debug
  });
  return Compress.send.bind(Compress);
};
export const Decompressor = ({ debug }) => {
  let Decompress = new DedicatedWorker({
    label: 'Decompressor',
    path: '/fugitive.worker.min.js',
    imports: [ 'https://unpkg.com/pako@1.0.6/dist/pako.min.js' ],
    method: (resolve, parameter) => {
      resolve(
        pako.inflate(parameter)
      );
    },
    debug
  });
  return Decompress.send.bind(Decompress);
};
