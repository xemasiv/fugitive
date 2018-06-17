# fugitive
Self-orchestrating p2p delivery network using WebRTC

## Project Goals

My goal here is to create an open-source approach in maximizing the current availability of WebRTC into optimizing our existing network architectures.

The gist is, Cloud Delivery Networks (CDN's) are indeed available and affordable right now - but that's the server-side of things being optimized. This project aims to address the client-side of things where we can leverage the prominent rise of WebRTC with other existing technologies, e.g. encoding, compression & cache's.

That's pretty much it: encoding, compression & cache **plus** WebRTC, all to optimize the way we receive images, videos, etc.

## Why is it possible now

(aka the motivating presumptions)

#### The fundamentals:

1. Moore's law
  * tl;dr we now got more and more devices in the market with higher compute capability. Processing power is one, processing stamina is another: pretty much everyone nowadays have their own almighty power bank.
2. Increasing internet penetration & connectivity
  * This means pursuits like this can also benefit end-user experiences in developing countries.
3. Increasing internet bandwidth quality
  * DSL's are continuously being replaced with Fiber, and 4g with 5g in the future. (this is it man, welcome to the future)

#### The awesome:

1. WebRTC
  * We can now establish direct connections with each other. We can do this not only on our desktop/laptop but also in our mobile phones nowadays.
2. Web Workers
  * Encoding / compression tasks can be handled by web worker threads which doesn't interfere with the main (aka user interface) thread.
3. Rise of SPA's
  * Great websites use good frameworks. These frameworks like React/Vue allows us to navigate web apps without refreshing the page. Not refreshing the page means existing WebRTC connections won't come to waste and can be maximized to full utility.
4. Smarter Web API's
  * We can detect pretty much everything nowadays, ie. if you're running on a battery (laptop / mobile), or if you're running in a good WebRTC-worthy connection (4g & up). Basice device information like these allows us to create better (or more appropriately, smarter) modules.

## Glossary / Terms

#### Fugitive Server

A server-side script whose purpose is to route signals between client instances, in order for them to establish WebRTC connections with each other. We are using `uws` for the WebSocket server instance.

#### Fugitive Client

A client-side script whose purpose is to establish WebRTC connection with other end-users, and to query & verify resources from these peers. We are using `simple-peer` for our WebRTC connection instances.

#### Fugitive Fetch

This is our drop-in replacement for `fetch`. We are using `yetch` from Netflix since it already comes with `AbortController`.

#### Tier-1 Peers

These are client instances of other end users..

1. Which have existing

#### Tier-2 Peers

These are client instances of other end users..

1. Which are not connected to you
2. But connected to your Tier-1 Peers

---


## Solved Issues

* Server-assisted pairing
* Server-assisted signalling
* Cancellable fetch with `yetch`
* Request multi-unicast to Tier-1 peers
* Storing of server-fetched resource to `quick-lru`
* Resource fetching from `quick-lru`
* Response chunking by `16 * 1024` bytes

## Existing Issues

* Server Instance
  * Clustering support?
* Client Instance
  * Target max connection count
  * Function to check if needed
  * Re-checks on WebRTC disconnects
* WebSockets
  * Reconnection + Exponential Back-off
  * Disconnected events, server-side
* Pairing
  * Add context support (ie. by Origin?)
  * Best-match-by-distance as calculated factor?
* WebRTC
  * Reconnection
  * Disconnected events, server-side
  * Latency testing & peer eviction support?
* Requests
  * De-coupling of content-type from input / output (functional)
  * Fetching from Tier-2 peers?
* Transfers
  * Locking of peer during transfer
  * Unlocking of peer during fetch-fulfilled requests
* Compression
  * Checking if content is worth keeping as compressed or not
  * Indicator if receiver should decompress or not
* Storage
  * Replace Sindre's LRU with PouchDB?
* Performance Sensitivity
  * Disable on low battery?
  * Decrease limits on browser devices?
  * Disable when window is inactive?
    * https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
  * Disable when using 4g internet?
    * https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API
  * Allow high-precision mode?
    * https://developer.mozilla.org/en-US/docs/Web/API/Geolocation

## Implementation Sugars

* Use of Web Workers
  * For WebSocket Client connection
  * For `pako` compressor
  * For `msgpack5` serializer
  * For `pouchdb-browser` storage?

## References

* https://www.html5rocks.com/en/tutorials/webrtc/datachannels/
* https://stackoverflow.com/a/35381583
* https://stackoverflow.com/a/43433129
* https://news.ycombinator.com/item?id=5452780 (lol for real)

## License

Copyright 2018 Joshua Samonte

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
