# fugitive
websockets & webrtc experiments

## Structure

* Exposed components
  * Server
  * Client
* Used libraries
  * Server-only
    * `uws`
  * Client-only
    * `simple-peer`
  * Server & Client
    * `pako`
    * `msgpack5`

* https://keybase.io/kbpgp
* https://medium.freecodecamp.org/how-does-pretty-good-privacy-work-3f5f75ecea97

![asd](/Diagrams1.png)

## Plugins

They can:

* Register a middleware.
* Manage existing connections.
* Create new connections.

---

## Centaurus

* Simplified script loading.
* Simplified function registration.
* Built-in serialization / de-serialization with `serialize-javascript`.
* Supported parameters:
  * https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
* Usage:

```js
let C = new Centaurus('/centaurus.worker.js');
C.loadScripts('https://unpkg.com/pako@1.0.6/dist/pako.min.js');
C.registerFunctions({
  test: (resolve, reject) => {
    console.log('function test executed');
    resolve(123456);
  },
  checkPako: (resolve, reject, param1, param2) => {
    console.log(pako);
    var result = ''.concat(param1, ' ', param2);
    resolve(result);
  }
});
window.C = C;
setTimeout(() => {
  C.test()
    .then(console.log)
    .catch(console.error);
  C.checkPako('is pako found?', 'yes!')
    .then(console.log)
    .catch(console.error);
}, 2000);
```

---

# Old Notes:

## Server-Side Notes

Factors that may affect performance are:

1. Values of `max_old_space_size` and `max_new_space_size`.
2. VM's CPU core count
3. VM's RAM
4. VM's Network Bandwidth

In this setup, it's ideal that:

* Clients are self-identifying, ie. use of Access Tokens (like Facebook API).
* Client sessions are coupled away from the workers, ie. use of Redis Cache.
* Server logs are coupled within the workers, with their client parameters as the context.

The process-level cluster can also be configured:

* Quoting the docs, `cluster.schedulingPolicy` can be set to `cluster.SCHED_RR` for round-robin or `cluster.SCHED_NONE` to leave it to the operating system.
* `cluster.setupMaster` & `cluster.settings`: quite long to cover here, see the docs.

Cluster `master` can communicate with `workers`:

* `master` can send message to a specific worker through `worker.send(message[, sendHandle][, callback])`.
* `worker` can receive it as `process.on('message', () => {})`.
* `worker` can send message to `master` through `process.send(msg)`
* `master` can receive messages from workers through `cluster.on('message', (worker, message, handle) => { })`

## Client-Side Notes

Writing the client:

* Client should automatically reconnect upon disconnect, or connection attempt failure.
* Client should have Exponential Back-off implementation on reconnection attempts.

Check out `client.js` for a wrapper that implements both criteria. You can test it in your browser.

Client must also support serialization of data:

* A great reference is Uber's https://eng.uber.com/trip-data-squeeze/ which shows us a decent comparison between serialization formats.

`serialization.js` provides a decent example using the following libraries:

* https://www.npmjs.com/package/msgpack5
* https://www.npmjs.com/package/pako

```
node serialization.js
```

Google's `Protocol Buffers` is also a better alternative:

* https://developers.google.com/protocol-buffers/docs/proto3
* https://www.npmjs.com/package/pbf

## Containerization

Heroku's 12-Factor: https://12factor.net

Ideal docker image environment:

* node:latest (comes with yarn)
* gcc & g++ (for node-gyp)

Reference `Dockerfile`:

* https://hub.docker.com/r/xemasiv/node-env/
* https://github.com/xemasiv/node-env/blob/master/Dockerfile

## References

* https://nodejs.org/api/cluster.html
* https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
* https://blog.jayway.com/2015/04/13/600k-concurrent-websocket-connections-on-aws-using-node-js/

## Testing

```
yarn run start
```

Then in your browser:

```js
for (let index = 0; index < 50; index++) {
  var y = new WebSocket('ws://127.0.0.1:80');
  y.addEventListener('message', console.log);
}
```

Or using `artillery`

1. `yarn install artillery --global`
2. Configure `artillery-test.js`
3. `artillery run artillery-test.js`

## License

Attribution 4.0 International (CC BY 4.0)

* https://creativecommons.org/licenses/by/4.0/
* https://creativecommons.org/licenses/by/4.0/legalcode.txt

![cc](https://creativecommons.org/images/deed/cc_blue_x2.png) ![by](https://creativecommons.org/images/deed/attribution_icon_blue_x2.png)
