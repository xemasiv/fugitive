
## Actions

#### WebSocketActions

* `@client` `i_am`
  * client introduces itself
  * params:
    * `client_id`
* `@client` `requesting_peers`
  * client is looking for peers
  * params:
    * `context_id`
* `@server` `requesting_offer`
  * server found a match, and is requesting for an `offer`
  * params:
    * `context_id`
* `@server` `wait_for_offer`
  * server found a match, and is awaiting an `offer`
  * params:
    * `context_id`
* `@client` `alice` `sending_offer`
  * client is sending an `offer`
  * params:
    * `offer`
    * `context_id`
* `@server` `forwarding_offer`
  * server is now forwarding the `offer` it received.
  * params:
    * `offer`
    * `context_id`
* `@client` `bob` `sending_answer`
  * client is sending an `answer`
  * params:
    * `answer`
    * `context_id`
* `@server` `forwarding_answer`
  * server is now forwarding the `answer` it received.
  * params:
    * `answer`
    * `context_id`

Notes:

* The purpose of `client_id` & `context_id` is for the server to avoid mistakingly matching asynchronous peer requests from the same device.
* We're using `alice` & `bob` identifiers here, where `alice` is the one who generates the `offer`, and `bob` is the one who generates the `answer`.

#### WebRTCActions

* `alice or bob` `i_am`
  * `alice` introduces herself to `bob` upon connection.
  * params:
    * `client_id`
* `alice or bob` `requesting_peer_list`
  * `bob` is requesting peer list of `alice`
* `bob or bob` `sending_peer_list`
  * `alice` is sending her peer list to `bob`
  * params:
    * `peer_list[]`
* `alice` `querying_resource`
  * `alice` is querying for a resource
  * params:
    * `hash` - hash of requested resource
* `alice` `reserve_resource`
  * `alice` is querying for a resource that is not urgently needed, and allows `bob` to fetch this resource from `tier-2` peers of `alice`.
* `bob` `resource_found`
  * `bob` is confirming availability of resource
  * params:
    * `hash` - hash of found resource
    * `size` - size in bytes of found resource
* `alice` `requesting_resource`
  * `alice` is giving the go signal for the transfer
  * params:
    * `hash` - hash of requested resource
* `bob` `transferring_resource`
  * `bob` will transfer within the next bytes
  * params:
    * `hash` - hash of requested resource

Notes:

* We're using `alice` & `bob` identifiers here, where `alice` is the one who's looking for some resource, and `bob` is the one responding and transferring the requested resource.
