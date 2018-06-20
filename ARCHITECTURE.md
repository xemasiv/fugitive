# Architecture

#### (work in progress)

## Solutions & Trade-offs

* This project pretty much revolves around solutions with trade-offs. Point being, we try to tweak and bend the trade-offs as much as we can to further deliver a better user experience - ie. faster loading of resources.

## Peer Discovery

###### Figure 1: Basic connections

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

## Content Discovery

#### Solution # 1: Verify peer-provided resources with server-provided hashes

* To quote Bitcoin's Satoshi Nakamoto, "What is needed is a.. ..system based on cryptographic proof instead of trust,.."
* Our clients should not trust resources provided by our peers on face value. Just because peer `Alice` claims she has `xyz.jpg`, it doesn't mean the file she sent is the actual file we were expecting. This leads us to requiring ourselves to verify the things we receive with our server.
* We can easily do this by including the `hash` of every referenced resource we receive from our server, and just using this `hash` to verify such authenticity when such resources are loaded from our peers.

###### Figure 2: Hash inclusion on server-provided resource links

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

###### Figure 3: An array of search results with image links

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

###### Figure 4: A result with inclusive image hash

```
{
  title: '...',
  price: '...',
  img: 'https://mysite.org/apartment1.png',
  img_hash: 'a6212a3522dbd7bb3c1203c67f6c4c8776267329c4c73465013f4e2c'
}
```

#### The Ideal Hash Function

* The `hash` function should be fast, compact and secure.
* A slow hash function creates latency overhead, a non-compact hash creates bandwidth consumption overhead, and generally an insecure hash will absolutely scare away developers and end-users.
* The `sha224` function from `js-sha256` library is selected for now since albeit not being a cryptography expert myself, a decent research I've done shows that it's reliable enough - and if you've got better, convincing suggestions on alternatives I'm really open for it.
* https://latacora.singles/2018/04/03/cryptographic-right-answers.html
* https://crypto.stackexchange.com/a/15155

## Optimizing Peer Discovery

#### Solution # 2: Pair clients with nearby clients

* Since the server does the pairing of clients, the server can further optimize by figuring out which potential peers are nearby a client, and just pairing them both.
* We can do this in our server by using the client IP Addresses to figure their approximate locations and applying basic arithmetic to figure out the best matches.
