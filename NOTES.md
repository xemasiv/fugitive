# fugitive
websockets & webrtc experiments

---

1. Rise of SPA's
2. Web Platform Improvements
	+ Fetch abort support
	+ WebRTC support
3. Device-agnostic Javascript
	+ Works in Web Browsers
	+ Also works with React Native
3. Increase in Device capability (Moore's law)
4. Increase in Internet penetration & connectivity
	+ more online devices
5. Increase in Internet bandwidth quality
	+ 4g, Fiber & 5g (in future)

Axios can also be used:
	* https://github.com/axios/axios#cancellation
Improvements in encoding protocols & compression algorithms
	* https://eng.uber.com/trip-data-squeeze/
	* We use protocol buffers (from `pbf`) & zlib (from `pako`)
Visualize with deck.gl / kepler.gl(uber)

Optimizations
	* Built-in p2p communications use protocol buffers.
	* Binary blobs -> zlib:
	* JSON objects -> msgpack -> zlib:
	* Everything is transferred as binary.
		* As protocol buffer buffers
		* Or as compressed binary files (for files, ie. images)

Can we use a binder?
Yes.


// create an observer instance
var target = document.querySelector('#something');
console.log(target);
var observer = new WebKitMutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      console.log("Success");
        //$('#log').text('input text changed: "' + target.text() + '"');
        //console.log(mutation, mutation.type);
    });    
});
observer.observe(target, { attributes: true, childList: true, characterData: true, subtree: true });
//observer.disconnect(); - to stop observing

// test case
setInterval(function(){
    document.querySelector('#something').innerHTML = Math.random();
},1000);
We can watch it for changes, and cache contents which are fucking big.

demo @ http://jsfiddle.net/6Jajs/1/
stackoverflow @ https://stackoverflow.com/a/24344093
support @ https://caniuse.com/#feat=mutationobserver
spec @ https://dom.spec.whatwg.org/#interface-mutationobserver
mdn @ https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

> This can be used to automatically cache the following:
> images (jpg/jpeg/gif/png/svg);

x = new XMLSerializer();
y = new DOMParser();
y.parseFromString(x.serializeToString(document.querySelector('body')), 'text/html');
@ https://w3c.github.io/DOM-Parsing/#the-domparser-interface

History & Location?
https://caniuse.com/#feat=history
https://github.com/ReactTraining/history
https://developer.mozilla.org/en-US/docs/Web/API/Location

---

## MVP

* Serialize / Deserialize w/ `msgpak`
* Compress / Decompress w/ `pako`
* WebSockets w/ `uws` (for server)
* WebRTC w/ `simple-peer` (for clients)

## Stalled

* Serialization w/ `msgpack` can be done with Web Workers
* Compression w/ `pako` can be done with Web Workers
* WebSockets can be done with Web Workers
* File Storage w/ `pouchdb` can be done with Web Workers

#### p2p next-requested resource sharing

When client is idle, peers fulfill succeeding resources
the user may 'possibly' request to the server in the future.

For example, we have user Alice.

1. Alice made a search query for 'Dogs'.
  * This request is sent to the server
  * This request is also sent to Alice's Tier-1 peers
2. Alice receives response for page 1 from server
  This response contains:
  * Page 1 results
  * Hash of page 2 results
  * Hash of page 3 results
3. Tier-1 peers ask Alice's Tier-2 peers if they
4. Alice is now reading page 1.
  Behind the scenes:
  * Alice verified if Bob (a Tier-1 peer) has page 2 results with matching hash
  * Bob sends Alice these page 2 results
  * Alice finds out Bob doesn't have, but maybe a Tier-2 peer has results for page-3
  * Bob (a Tier-1 peer) asks Charlie (a Tier-2 peer) for it
  * Bob forwards it to Alice

#### content segment assigning



---

## Goals

* Offload loading of assets to peers
  * Images
  * Video / Audio
  * Binary Files
* Offload static requests to peers
  * Search Queries
* Optimize p2p connections
  * WebSocket Server
  * WebRTC Client
  * Reconnection w/ exponential back-off
* Optimize p2p transfers
  * Serialization
  * Compression
* Optimize processing
  * Use of Web Workers

## Progress

* Libraries Used
  * `uws` ![](/chk.png "ok")
  * `simple-peer` ![](/chk.png "ok")
  * `msgpack5` ![](/chk.png "ok")
  * `pako` ![](/chk.png "ok")
  * `centaurus` ![](/chk.png "ok")
  * `approximate-distance` ![](/chk.png "ok")
  * `maxmind`
  * `all-the-cities`
  * `kbpgp`
* Plugins
  * Exponential Back-off
    * For WebSocket Clients
  * Assisted Peer Exchange
    * For WebSocket Server & WebRTC Clients
  * Adaptive Peer Exchange
    * For WebRTC Clients
    * Uses
  * Local Storage

---

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
