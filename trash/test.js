var C = new Centaurus('http://localhost:8000/centaurus.worker.js');

// load umd scripts, be it lodash, whatever.
Promise.resolve()
  .then(() => {
    return C.loadScripts(
      'http://localhost:8000/pako.min.js',
    );
  })
  .then(() => {
    return C.registerFunctions({
      serialize: (resolve, reject, o) => {
        /*
        const serialized = pako.deflate(msgpack5.encode(o), {
          level: 9,
          memLevel: 9
        });
        console.log('serialized in worker:', serialized);
        */
        resolve(serialized);
      },
      deserialize: (resolve, reject, b) => {
        /*
        console.log('pako:', pako);
        */
        resolve(msgpack5.decode(pako.inflate(b)));
      },
    });
  })
  .then(() => C.serialize(new Uint8Array(25000)))
  .then((result) => console.log('serialized received:', result))
  .catch(console.error);
