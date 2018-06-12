import { Compressor, Decompressor } from './helpers/pakoWorkers';
import { Serializer, Deserializer } from './helpers/msgpackWorkers';

const debug = false;

const Compress = Compressor({ debug, level: 9, memLevel: 9 });
const Decompress = Decompressor({ debug });
const Serialize = Serializer({ debug });
const Deserialize = Deserializer({ debug });

const timeStart = Date.now();
Serialize({ a: 1, bytes: new Uint8Array(1000000) }, (serialized) => {
  // console.log('serialized:', serialized);
  Compress(serialized, (compressed) => {
    // console.log('compressed:', compressed);
    Decompress(compressed, (decompressed) => {
      // console.log('decompressed:', decompressed);
      Deserialize(decompressed, (deserialized) => {
        console.log(Date.now() - timeStart);
        // console.log('deserialized:', deserialized);
      })
    });
  });
});
