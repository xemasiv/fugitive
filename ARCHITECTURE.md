# Architecture

#### (work in progress)

---

# Peer Discovery

---

#### PROBLEM:

An intermediary is required in establishing WebRTC connections between two clients.

#### SOLUTION:

Use a WebSocket server as an intermediary in pairing clients, and use native client-side WebSocket API to relay WebRTC `offer` & `answer` signals.

###### Figure X: Basic connections

```
----------------- SERVER -----------------
WebSocketServer
------------------------------------------
^                         ^  
| |                       | |
  v                         v
--- CLIENT A ---          --- CLIENT B ---
WebSocketClient           WebSocketClient

WebRTCClient        -->   WebRTCClient
                    <--
----------------          ---------------
```

* `WebSocketServer`
  * A `uws` or `ws` instance
* `WebSocketClient`
  * A native `WebSocket` instance
* `WebRTCClient`
  * A `simple-peer` instance
* `WebSocketServer` & `WebSocketClient` are required in order for clients to establish WebRTC connections with each other. Here, the server takes the role of pairing clients, and forwarding of `offer` & `answer` signals between each paired clients.

---

#### PROBLEM:

We need a simple, community-approved interface to easily create WebRTC connections between clients.

#### SOLUTION:

Use `simple-peer`.

---

#### PROBLEM:

Pairing two clients that have bad round-trip time

#### SOLUTION:

Pair clients with nearby clients

* Since the server does the pairing of clients, the server can further optimize by figuring out which potential peers are nearby a client, and just pairing them both.
* We can do this in our server by using the client `IP Addresses` to figure their approximate locations and applying basic arithmetic to figure out the best matches.

Using third-party `IP Geolocation` data

* Accuracy can be improved by utilizing raw `IP-CITY-LAT-LONG` datasets. The gist is using our end-users' IP Addresses, we can lookup their city across these datasets, where we can either match users living within the same cities, or furthermore find a potential peer whose city is closer to another user in another city.
* `IP-ASN` datasets can also be used to match users with the same Internet Service Provider (`ISP`).

Using browser-provided `Geolocation API`

* Accuracy can also be further improved with the help of the end-users by using the `Geolocation API`
  * https://caniuse.com/#feat=geolocation

---

#### PROBLEM:

Peers currently in pairing phases may lose their connection

#### SOLUTION:

~

---

#### PROBLEM:

Client reconnecting instantly on each failed connection attempt can affect the end-user experience; and a great amount of clients reconnecting simultaneously can render our server non-responsive.

#### SOLUTION:

1. Use a better WebSocket library, like `uws`.
2. Implement an `Exponential Back-off Algorithm` on each reconnection attempt.

---

# Content Delivery

---

#### PROBLEM:

Clients should be able to verify the authenticity of resources they receive from their peers.

#### SOLUTION:

We rely on cryptographic proofs, instead of trust.

* Our clients should not trust resources provided by our peers on face value. Just because peer `Alice` claims she has `xyz.jpg`, it doesn't mean the file she sent is the actual file we were expecting. This leads us to requiring ourselves to verify the things we receive with our server.
* We can easily do this by including the `hash` of every referenced resource we receive from our server, and just using this `hash` to verify such authenticity when such resources are loaded from our peers.

###### Figure X: Hash inclusion on server-provided resource links

```
----- SERVER -----
^ [1]
|           |
            v [2]
----- CLIENT -----
```

* [1] - Whenever a user does something, ie. navigates a page, or makes a search query, at times the server has to include links to specific resources.
  * For example, a user of a real-estate web app might query for `apartments` in `Chicago`, our servers just return the list of results inclusive with links to images.
* [2] - Ideally, the server already has a pre-hashed these resources and will just include these hashes on the fly on each and every resource request.

###### Figure X: An array of search results with image links

```
  results: [
    {
      title: '...',
      price: '...',
      img: 'https://mysite.org/apartment1.png'
    },
    {
      title: '...',
      price: '...',
      img: 'https://mysite.org/apartment2.png'
    }
  ]
```

###### Figure X: A result with inclusive image hash

```
{
  title: '...',
  price: '...',
  img: 'https://mysite.org/apartment1.png',
  img_hash: 'a6212a3522dbd7bb3c1203c67f6c4c8776267329c4c73465013f4e2c'
}
```

* Now, using this `hash` we can just hash the bytes we receive from our peers before we use them.

---

#### PROBLEM:

We need a fast, compact & reliable hash function.

* A slow hash function creates latency overhead, a non-compact hash creates bandwidth consumption overhead, and generally an insecure hash will absolutely scare away developers and end-users.

#### SOLUTION:

Use `SHA-244` in the mean time.

* The `sha224` function from `js-sha256` library is selected for now since albeit not being a cryptography expert myself, a decent research I've done shows that it's reliable enough - and if you've got better, convincing suggestions on alternatives I'm really open for it.
  * https://latacora.singles/2018/04/03/cryptographic-right-answers.html
  * https://crypto.stackexchange.com/a/15155

---

#### PROBLEM:

Peers currently transferring resources may lose their connection

#### SOLUTION:

~

---

# Resource Storage Persistence

---

#### PROBLEM:

We need to persist data.

#### SOLUTION:

Use a custom build of `PouchDB`.

Their `pouchdb-browser` is still quite bulky, but according to their docs, we can go as far as importing only the modules that we need in order to reduce bundle size.

* https://pouchdb.com/custom.html

```js
// THIS:
var PouchDB = require('pouchdb-browser');

// IS EQUAL TO THIS:
var PouchDB = require('pouchdb-core')
  .plugin(require('pouchdb-adapter-idb'))
  .plugin(require('pouchdb-adapter-http'))
  .plugin(require('pouchdb-mapreduce'))
  .plugin(require('pouchdb-replication'));

// WHICH CAN BE REDUCED TO:
var PouchDB = require('pouchdb-core')
  .plugin(require('pouchdb-adapter-idb'));
```

---

## Potential Risks

* (still thinking about this, open for discussion)
* Browser Compatibility Issues
* Privacy Issues

## Performance

https://blog.dshr.org/2014/10/economies-of-scale-in-peer-to-peer.html

Trading Performance for Latency

https://blog.dshr.org/2018/02/do-you-need-blockchain.html










//
