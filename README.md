# fugitive
Self-orchestrating p2p delivery network using WebRTC

## Project Goals

My goal here is to create an open-source approach in maximizing the current availability of WebRTC into optimizing our existing network architectures.

The gist is, Cloud Delivery Networks (CDN's) are indeed available and affordable right now - but that's the server-side of things being optimized. This project aims to address the client-side of things where we can leverage the prominent rise of WebRTC with other existing technologies, e.g. encoding, compression & cache's.

That's pretty much it: encoding, compression & cache **plus** WebRTC, all to optimize the way we receive images, videos, etc.

## Why is it possible now

(aka the non-statistical motivating presumptions)

#### Moore's law

* We now got more and more devices in the market with higher compute capability. Processing power is one, processing stamina is another: pretty much everyone nowadays have their own almighty power bank.

#### Increasing internet penetration & connectivity

* This means pursuits like this can also benefit end-user experiences in developing countries.

#### Increasing internet bandwidth quality

* DSL's are continuously being replaced with Fiber, and 4g with 5g in the future.

#### WebRTC

* We can now establish direct connections with each other. We can do this not only on our desktop/laptop but also in our mobile phones nowadays.

#### Web Workers

* Encoding / compression tasks can be handled by web worker threads which doesn't interfere with the main (aka user interface) thread.

#### Rise of SPA's

* Great websites use good frameworks. These frameworks like React/Vue allows us to navigate web apps without refreshing the page. Not refreshing the page means existing WebRTC connections won't come to waste and can be maximized to full utility.

#### Smarter Web API's

* We can detect pretty much everything nowadays, ie. if you're running on a battery (laptop / mobile), or if you're running in a good WebRTC-worthy connection (4g & up). Basic device information like these allows us to create better (or more appropriately, smarter) modules.

#### tl;dr

* This is it man, welcome to the future.

## Glossary / Terms

#### Fugitive Server

A server-side script whose purpose is to route signals between client instances, in order for them to establish WebRTC connections with each other. We are currently using `uws` for the WebSocket server instance.

#### Fugitive Client

A client-side script whose purpose is to establish WebRTC connection with other end-users, and to query & verify resources from these peers. We are currently using `simple-peer` for our WebRTC connection instances.

#### Fugitive Fetch

This is our drop-in replacement for `fetch`. We are using `yetch` from Netflix since it already comes with `AbortController`.

#### Tier-1 Peers

These are client instances of other end users..

1. Which have existing WebRTC connections with you

#### Tier-2 Peers

These are client instances of other end users..

1. Which are not connected to you
2. But has existing WebRTC connections with your Tier-1 Peers

---

## Roadmap

#### Server-side Mechanisms

* Assisted signal forwarding ![done](/i/chk.png)
* `first-available-pair` pairing ![done](/i/chk.png)
* `approximate-distance-factor-pair` pairing
* Clustering support

#### Client Mechanisms

* Signal: Offering ![done](/i/chk.png)
* Signal: Answering ![done](/i/chk.png)
* Response chunking by `16 * 1024` bytes ![done](/i/chk.png)
* SHA 224 hash verification
* *Integer* `min_target_peer_count` config option
* *Integer* `max_target_peer_count` config option
* Peer checks on websocket connect
* Peer checks on peer connect & disconnect
* *Boolean* `disconnect_websocket_on_max` config option
* Exponential back-off mechanism on reconnection attempts
* Passive resource reservation (w/ Tier-1 + Tier-2 peers)
* Peer locking & unlocking between transfers
* Passive latency checking & peer-eviction
* Checking if content is worth keeping as compressed or not
* Transfer indicator if content is compressed or not
* Disable on low battery?
* Decrease limits on mobile devices?
* Disable when window is inactive? (Page Visibility API)
* Disable when using 4g internet? (Network Information API)
* Allow high-precision mode for clients? (Geolocation API)

#### Fugitive Fetch

* Simulated multicast (multiple unicast) ![done](/i/chk.png)
* In-memory caching, with `quick-lru` ![done](/i/chk.png)
* De-coupling of content-type from input / output
* IndexedDB persistent storage

#### Web Assets Loading Examples

* JS / CSS Scripts
* Fonts
* Images (jpg / png / svg / webp / gif)

#### Web Workers

* Encoding Worker, with `msgpack`
* Compression Worker, with `pako`
* WebSocket Client Worker

#### MPEG DASH Loading Support

* `fugitive-dashjs`, using fugitive fetch

#### Visualizer / Playground

* Using uber's `deck.gl`

---

## License

![mit](/i/license.png)


(Art by excaliburzero@deviantart, CC-BY-3.0)

Copyright © 2018 Isaiah Joshua M. Samonte

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
