# expedite
websocket boilerplate with scale in mind, `uws` + `cluster`

## Notes

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
