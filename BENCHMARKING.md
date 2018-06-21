# Benchmarking

#### (work in progress)

To properly benchmark performance gains, we should test against a live cdn instance.

For example, we've got a `1298 KB` file at `'http://35.241.40.149/test.jpg'`, we can easily test our cdn endpoint's raw roundtrip time by just requesting the first byte.

```js
axios.get(
  'http://35.241.40.149/test.jpg',
  {
    headers: {
      'Range': 'bytes=0-0'
    },
    responseType: 'arraybuffer'
  }
)
  .then(console.log)
  .catch(console.error);
```

For example: in my desktop with 4g internet, my roundtrip time (`RTT`) ranges from `522ms` to `661ms`. We can run multiple request to get samples in order for us to arrive to a `median` value and we can use this in multiple ways:

1. If a peer's `RTT` is worse than our `median`, we can spartan-kick evict that peer.
2. If a peer's `RTT` is better than our `median`, we classify them as better source candidates



































//
