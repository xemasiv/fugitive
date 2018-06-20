## Range Requests Using Axios

Sample request:

```js
const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/220px-Muhammad_Ali_NYWTS.jpg';

axios.get(
  url, {
    headers: {
      'Range': 'bytes=100--1'
    },
    responseType: 'arraybuffer'
  }
)
  .then(console.log)
  .catch(console.error);
```

Sample Response `headers`:

```
"{
  "date":"Tue, 19 Jun 2018 08:04:03 GMT",
  "content-type":"image/jpeg",
  "age":"69792",
  "x-cache":"cp1074 hit/14, cp2014 pass, cp5001 miss, cp5001 hit/238",
  "content-range":"bytes 100-8814/8815",
  "last-modified":"Thu, 31 Oct 2013 14:48:59 GMT",
  "x-varnish":"247827316 89773908, 65586865, 1279247, 941137434 738107780",
  "content-length":"8715"
}"
```

* `bytes=0-100` - 0 to 100
* `bytes=0--1` - 0 to end
* `bytes=100--1` - 100 to end
* `bytes=-500` - last 500 bytes
* `bytes=0-0,-1` - first and last byte

@ https://www.keycdn.com/support/byte-range-requests/

## Why `sha224`

* https://news.ycombinator.com/item?id=14455516

## Research Notes & References

* https://www.html5rocks.com/en/tutorials/webrtc/datachannels/
* https://stackoverflow.com/a/35381583
* https://stackoverflow.com/a/43433129
* https://news.ycombinator.com/item?id=5452780
  * highlights security & privacy issues we might encounter
* http://zguide.zeromq.org/php:chapter8

## Architecture

#### Peer Discovery

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

#### Content Discovery

###### Figure 2: Hash inclusion on server-provided links

```
----- SERVER -----
^ [1]
|           |
            v [2]
----- CLIENT -----
```

* [1] - asdasd

```
{
  url: 'wikipedia.org/muhammad_ali.png',
  hash: 'a6212a3522dbd7bb3c1203c67f6c4c8776267329c4c73465013f4e2c'
}
```

#### Latency vs Bandwidth














//
