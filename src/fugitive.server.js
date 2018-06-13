import msgpack5 from 'msgpack5';
import uws from 'uws';
import debug from 'debug';

const log = debug('server');
log.enabled = true;

const msgpack = msgpack5();

const WebSocketServer = uws.Server;
const wss = new WebSocketServer({ port: 80 });

const seeking = [];
const pairs = [];
const serializer = (ws) => (m) => ws.send(msgpack.encode(m));
wss.on('connection', (ws) => {
  const send = serializer(ws);
  ws.on('message', (m) => {
    const { status, offer, answer } = msgpack.decode(m);
    let alice, bob, pair;
    switch (status) {
      case 'seeking':
        seeking.push(ws);
        if (seeking.length === 2) {
          log('pair found');
          alice = seeking.shift();
          bob = seeking.shift();
          serializer(alice)({
            ur: 'alice',
            status: 'creating_offer'
          });
          serializer(bob)({
            ur: 'bob',
            status: 'awaiting_offer'
          });
          pairs.push({ alice, bob });
        }
        break;
      case 'sending_offer':
        pair = pairs.filter((pair) => {
          return pair.alice === ws;
        })[0];
        serializer(pair.bob)({
          status: 'receiving_offer',
          offer
        });
        break;
      case 'sending_answer':
        pair = pairs.filter((pair) => {
          return pair.bob === ws;
        })[0];
        serializer(pair.alice)({
          status: 'receiving_answer',
          answer
        });
        break;
      default:
        log('unhandled:', status);
        break;
    }
  });
  send({ status: 'welcome' });

});
log('listening on port 80');
