# fugitive
Orchestrated p2p delivery network

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

## License

Copyright 2018 Joshua Samonte

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
