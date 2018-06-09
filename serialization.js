const msgpack = require('msgpack5')();
const pako = require('pako');
const serialize = (o) => pako.deflate(msgpack.encode(o), {
  level: 9,
  memLevel: 9
});
const deserialize = (b) => msgpack.decode(pako.inflate(b));

const sample = [ {
  "type" : "WatchEvent",
  "actor" : {
    "avatar_url" : "https://secure.gravatar.com/avatar/f873c249ce2812e897cdd3eb8cc697ea?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
    "url" : "https://api.github.com/users/pkorotkov",
    "id" : 532567,
    "gravatar_id" : "f873c249ce2812e897cdd3eb8cc697ea",
    "login" : "pkorotkov"
  },
  "repo" : {
    "url" : "https://api.github.com/repos/mbeale/gorecurly",
    "id" : 4352662,
    "name" : "mbeale/gorecurly"
  },
  "public" : true,
  "payload" : {
    "action" : "started"
  },
  "created_at" : "2012-11-06T19:05:50Z",
  "id" : "1622434428"
}, {
  "type" : "PushEvent",
  "actor" : {
    "avatar_url" : "https://secure.gravatar.com/avatar/05abda697c2654a02391248bed3a5f3e?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
    "url" : "https://api.github.com/users/mbeale",
    "id" : 1507647,
    "gravatar_id" : "05abda697c2654a02391248bed3a5f3e",
    "login" : "mbeale"
  },
  "repo" : {
    "url" : "https://api.github.com/repos/mbeale/gorecurly",
    "id" : 4352662,
    "name" : "mbeale/gorecurly"
  },
  "public" : true,
  "payload" : {
    "head" : "8903434ff78a3e43938b971e08ff7c38425910e2",
    "ref" : "refs/heads/master",
    "commits" : [ {
      "distinct" : true,
      "url" : "https://api.github.com/repos/mbeale/gorecurly/commits/8903434ff78a3e43938b971e08ff7c38425910e2",
      "author" : {
        "email" : "michael.beale@gmail.com",
        "name" : "Michael Beale"
      },
      "message" : "Finalized testing",
      "sha" : "8903434ff78a3e43938b971e08ff7c38425910e2"
    } ],
    "before" : "e807886615121a86c3d3708a567033ab515cebd4",
    "size" : 1,
    "push_id" : 100453377
  },
  "created_at" : "2012-08-29T19:37:10Z",
  "id" : "1591257864"
}, {
  "type" : "PushEvent",
  "actor" : {
    "avatar_url" : "https://secure.gravatar.com/avatar/05abda697c2654a02391248bed3a5f3e?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
    "url" : "https://api.github.com/users/mbeale",
    "id" : 1507647,
    "gravatar_id" : "05abda697c2654a02391248bed3a5f3e",
    "login" : "mbeale"
  },
  "repo" : {
    "url" : "https://api.github.com/repos/mbeale/gorecurly",
    "id" : 4352662,
    "name" : "mbeale/gorecurly"
  },
  "public" : true,
  "payload" : {
    "head" : "e807886615121a86c3d3708a567033ab515cebd4",
    "ref" : "refs/heads/master",
    "commits" : [ {
      "distinct" : true,
      "url" : "https://api.github.com/repos/mbeale/gorecurly/commits/e807886615121a86c3d3708a567033ab515cebd4",
      "author" : {
        "email" : "michael.beale@gmail.com",
        "name" : "Michael Beale"
      },
      "message" : "fixed url params",
      "sha" : "e807886615121a86c3d3708a567033ab515cebd4"
    } ],
    "push_id" : 99165761,
    "size" : 1,
    "before" : "b76c09779e44147678274b318d0fe1794017dce6"
  },
  "created_at" : "2012-08-23T20:10:56Z",
  "id" : "1588963050"
}, {
  "type" : "PushEvent",
  "actor" : {
    "avatar_url" : "https://secure.gravatar.com/avatar/05abda697c2654a02391248bed3a5f3e?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
    "url" : "https://api.github.com/users/mbeale",
    "id" : 1507647,
    "gravatar_id" : "05abda697c2654a02391248bed3a5f3e",
    "login" : "mbeale"
  },
  "repo" : {
    "url" : "https://api.github.com/repos/mbeale/gorecurly",
    "id" : 4352662,
    "name" : "mbeale/gorecurly"
  },
  "public" : true,
  "payload" : {
    "head" : "b76c09779e44147678274b318d0fe1794017dce6",
    "ref" : "refs/heads/master",
    "commits" : [ {
      "distinct" : true,
      "url" : "https://api.github.com/repos/mbeale/gorecurly/commits/b76c09779e44147678274b318d0fe1794017dce6",
      "author" : {
        "email" : "michael.beale@gmail.com",
        "name" : "Michael Beale"
      },
      "message" : "updating testing and paging",
      "sha" : "b76c09779e44147678274b318d0fe1794017dce6"
    } ],
    "push_id" : 98918582,
    "size" : 1,
    "before" : "5de0de4c8e3718fe8cc3e0662ab539fcd5e884bd"
  },
  "created_at" : "2012-08-22T22:59:07Z",
  "id" : "1588522180"
}, {
  "type" : "PushEvent",
  "actor" : {
    "avatar_url" : "https://secure.gravatar.com/avatar/05abda697c2654a02391248bed3a5f3e?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
    "url" : "https://api.github.com/users/mbeale",
    "id" : 1507647,
    "gravatar_id" : "05abda697c2654a02391248bed3a5f3e",
    "login" : "mbeale"
  },
  "repo" : {
    "url" : "https://api.github.com/repos/mbeale/gorecurly",
    "id" : 4352662,
    "name" : "mbeale/gorecurly"
  },
  "public" : true,
  "payload" : {
    "head" : "5de0de4c8e3718fe8cc3e0662ab539fcd5e884bd",
    "ref" : "refs/heads/master",
    "commits" : [ {
      "distinct" : true,
      "url" : "https://api.github.com/repos/mbeale/gorecurly/commits/5de0de4c8e3718fe8cc3e0662ab539fcd5e884bd",
      "author" : {
        "email" : "michael.beale@gmail.com",
        "name" : "Michael Beale"
      },
      "message" : "updated testing",
      "sha" : "5de0de4c8e3718fe8cc3e0662ab539fcd5e884bd"
    } ],
    "before" : "71e5288b050cc99383144946b16223273ed05fa6",
    "size" : 1,
    "push_id" : 98323833
  },
  "created_at" : "2012-08-20T22:53:42Z",
  "id" : "1587506498"
}, {
  "type" : "PushEvent",
  "actor" : {
    "avatar_url" : "https://secure.gravatar.com/avatar/05abda697c2654a02391248bed3a5f3e?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
    "url" : "https://api.github.com/users/mbeale",
    "id" : 1507647,
    "gravatar_id" : "05abda697c2654a02391248bed3a5f3e",
    "login" : "mbeale"
  },
  "repo" : {
    "url" : "https://api.github.com/repos/mbeale/gorecurly",
    "id" : 4352662,
    "name" : "mbeale/gorecurly"
  },
  "public" : true,
  "payload" : {
    "head" : "71e5288b050cc99383144946b16223273ed05fa6",
    "ref" : "refs/heads/master",
    "commits" : [ {
      "distinct" : true,
      "url" : "https://api.github.com/repos/mbeale/gorecurly/commits/5db6781727253b34d827fed9e073cfa79abb57d6",
      "message" : "finished subscriptions and transactions",
      "author" : {
        "email" : "michael.beale@gmail.com",
        "name" : "Michael Beale"
      },
      "sha" : "5db6781727253b34d827fed9e073cfa79abb57d6"
    }, {
      "distinct" : true,
      "url" : "https://api.github.com/repos/mbeale/gorecurly/commits/71e5288b050cc99383144946b16223273ed05fa6",
      "message" : "Upgrading live testing",
      "author" : {
        "email" : "michael.beale@gmail.com",
        "name" : "Michael Beale"
      },
      "sha" : "71e5288b050cc99383144946b16223273ed05fa6"
    } ],
    "before" : "1ef3fe9e1b1aa6637e271e682f55c550d0c1925a",
    "push_id" : 97043378,
    "size" : 2
  },
  "created_at" : "2012-08-14T22:46:59Z",
  "id" : "1585299563"
}, {
  "type" : "PushEvent",
  "actor" : {
    "avatar_url" : "https://secure.gravatar.com/avatar/05abda697c2654a02391248bed3a5f3e?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
    "url" : "https://api.github.com/users/mbeale",
    "id" : 1507647,
    "gravatar_id" : "05abda697c2654a02391248bed3a5f3e",
    "login" : "mbeale"
  },
  "repo" : {
    "url" : "https://api.github.com/repos/mbeale/gorecurly",
    "id" : 4352662,
    "name" : "mbeale/gorecurly"
  },
  "public" : true,
  "payload" : {
    "head" : "1ef3fe9e1b1aa6637e271e682f55c550d0c1925a",
    "ref" : "refs/heads/master",
    "commits" : [ {
      "distinct" : true,
      "url" : "https://api.github.com/repos/mbeale/gorecurly/commits/1ef3fe9e1b1aa6637e271e682f55c550d0c1925a",
      "author" : {
        "email" : "michael.beale@gmail.com",
        "name" : "Michael Beale"
      },
      "message" : "started subscriptions",
      "sha" : "1ef3fe9e1b1aa6637e271e682f55c550d0c1925a"
    } ],
    "push_id" : 92496789,
    "size" : 1,
    "before" : "8eff5657ad2f098ed21d07b6c3423baba64f6530"
  },
  "created_at" : "2012-07-24T22:41:33Z",
  "id" : "1577423117"
}, {
  "type" : "PushEvent",
  "actor" : {
    "avatar_url" : "https://secure.gravatar.com/avatar/05abda697c2654a02391248bed3a5f3e?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
    "url" : "https://api.github.com/users/mbeale",
    "id" : 1507647,
    "gravatar_id" : "05abda697c2654a02391248bed3a5f3e",
    "login" : "mbeale"
  },
  "repo" : {
    "url" : "https://api.github.com/repos/mbeale/gorecurly",
    "id" : 4352662,
    "name" : "mbeale/gorecurly"
  },
  "public" : true,
  "payload" : {
    "head" : "8eff5657ad2f098ed21d07b6c3423baba64f6530",
    "ref" : "refs/heads/master",
    "commits" : [ {
      "distinct" : true,
      "url" : "https://api.github.com/repos/mbeale/gorecurly/commits/8eff5657ad2f098ed21d07b6c3423baba64f6530",
      "message" : "updated plan add ons",
      "author" : {
        "email" : "michael.beale@gmail.com",
        "name" : "Michael Beale"
      },
      "sha" : "8eff5657ad2f098ed21d07b6c3423baba64f6530"
    } ],
    "push_id" : 92226703,
    "before" : "bcc54ff780ca20be6b9444da5dee4733aea04701",
    "size" : 1
  },
  "created_at" : "2012-07-23T22:42:56Z",
  "id" : "1576957795"
}, {
  "type" : "PushEvent",
  "actor" : {
    "avatar_url" : "https://secure.gravatar.com/avatar/05abda697c2654a02391248bed3a5f3e?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
    "url" : "https://api.github.com/users/mbeale",
    "id" : 1507647,
    "gravatar_id" : "05abda697c2654a02391248bed3a5f3e",
    "login" : "mbeale"
  },
  "repo" : {
    "url" : "https://api.github.com/repos/mbeale/gorecurly",
    "id" : 4352662,
    "name" : "mbeale/gorecurly"
  },
  "public" : true,
  "payload" : {
    "head" : "bcc54ff780ca20be6b9444da5dee4733aea04701",
    "ref" : "refs/heads/master",
    "commits" : [ {
      "distinct" : true,
      "url" : "https://api.github.com/repos/mbeale/gorecurly/commits/bcc54ff780ca20be6b9444da5dee4733aea04701",
      "message" : "making changes to structure",
      "author" : {
        "email" : "michael.beale@gmail.com",
        "name" : "Michael Beale"
      },
      "sha" : "bcc54ff780ca20be6b9444da5dee4733aea04701"
    } ],
    "size" : 1,
    "push_id" : 91298796
  },
  "created_at" : "2012-07-18T23:00:46Z",
  "id" : "1575333013"
}, {
  "type" : "PushEvent",
  "actor" : {
    "avatar_url" : "https://secure.gravatar.com/avatar/05abda697c2654a02391248bed3a5f3e?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
    "url" : "https://api.github.com/users/mbeale",
    "id" : 1507647,
    "gravatar_id" : "05abda697c2654a02391248bed3a5f3e",
    "login" : "mbeale"
  },
  "repo" : {
    "url" : "https://api.github.com/repos/mbeale/gorecurly",
    "id" : 4352662,
    "name" : "mbeale/gorecurly"
  },
  "public" : true,
  "payload" : {
    "head" : "6cd4d4e6da5297b9ba8f6113f4c583fc61a6e3ba",
    "ref" : "refs/heads/master",
    "commits" : [ {
      "distinct" : true,
      "url" : "https://api.github.com/repos/mbeale/gorecurly/commits/6cd4d4e6da5297b9ba8f6113f4c583fc61a6e3ba",
      "author" : {
        "email" : "michael.beale@gmail.com",
        "name" : "Michael Beale"
      },
      "message" : "finished invoices, started plans",
      "sha" : "6cd4d4e6da5297b9ba8f6113f4c583fc61a6e3ba"
    } ],
    "push_id" : 80799412,
    "size" : 1
  },
  "created_at" : "2012-05-28T01:42:11Z",
  "id" : "1556368471"
}, {
  "type" : "PushEvent",
  "actor" : {
    "avatar_url" : "https://secure.gravatar.com/avatar/05abda697c2654a02391248bed3a5f3e?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
    "url" : "https://api.github.com/users/mbeale",
    "id" : 1507647,
    "gravatar_id" : "05abda697c2654a02391248bed3a5f3e",
    "login" : "mbeale"
  },
  "repo" : {
    "url" : "https://api.github.com/repos/mbeale/gorecurly",
    "id" : 4352662,
    "name" : "mbeale/gorecurly"
  },
  "public" : true,
  "payload" : {
    "head" : "bce3472f22861612554b510cef35da6d2cf29d22",
    "ref" : "refs/heads/master",
    "commits" : [ {
      "distinct" : true,
      "url" : "https://api.github.com/repos/mbeale/gorecurly/commits/bce3472f22861612554b510cef35da6d2cf29d22",
      "author" : {
        "email" : "michael.beale@gmail.com",
        "name" : "Michael Beale"
      },
      "message" : "added stubs and account stub",
      "sha" : "bce3472f22861612554b510cef35da6d2cf29d22"
    } ],
    "push_id" : 80385411,
    "size" : 1
  },
  "created_at" : "2012-05-24T20:52:05Z",
  "id" : "1555612870"
}, {
  "type" : "PushEvent",
  "actor" : {
    "avatar_url" : "https://secure.gravatar.com/avatar/05abda697c2654a02391248bed3a5f3e?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
    "url" : "https://api.github.com/users/mbeale",
    "id" : 1507647,
    "gravatar_id" : "05abda697c2654a02391248bed3a5f3e",
    "login" : "mbeale"
  },
  "repo" : {
    "url" : "https://api.github.com/repos/mbeale/gorecurly",
    "id" : 4352662,
    "name" : "mbeale/gorecurly"
  },
  "public" : true,
  "payload" : {
    "head" : "188b493182f343d979d0f19b342eb2e9adc5bad5",
    "ref" : "refs/heads/master",
    "commits" : [ {
      "distinct" : true,
      "url" : "https://api.github.com/repos/mbeale/gorecurly/commits/188b493182f343d979d0f19b342eb2e9adc5bad5",
      "author" : {
        "email" : "michael.beale@gmail.com",
        "name" : "Michael Beale"
      },
      "message" : "added error codes and some structs",
      "sha" : "188b493182f343d979d0f19b342eb2e9adc5bad5"
    } ],
    "push_id" : 80165472,
    "size" : 1
  },
  "created_at" : "2012-05-23T22:53:14Z",
  "id" : "1555228006"
}, {
  "type" : "PushEvent",
  "actor" : {
    "avatar_url" : "https://secure.gravatar.com/avatar/05abda697c2654a02391248bed3a5f3e?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
    "url" : "https://api.github.com/users/mbeale",
    "id" : 1507647,
    "gravatar_id" : "05abda697c2654a02391248bed3a5f3e",
    "login" : "mbeale"
  },
  "repo" : {
    "url" : "https://api.github.com/repos/mbeale/gorecurly",
    "id" : 4352662,
    "name" : "mbeale/gorecurly"
  },
  "public" : true,
  "payload" : {
    "head" : "5ad387049336eba40dc0b33a1bbf52ce9c8ea289",
    "ref" : "refs/heads/master",
    "commits" : [ {
      "distinct" : true,
      "url" : "https://api.github.com/repos/mbeale/gorecurly/commits/5ad387049336eba40dc0b33a1bbf52ce9c8ea289",
      "author" : {
        "email" : "michael.beale@gmail.com",
        "name" : "Michael Beale"
      },
      "message" : "Adding Billing Info ops",
      "sha" : "5ad387049336eba40dc0b33a1bbf52ce9c8ea289"
    } ],
    "size" : 1,
    "push_id" : 79306350
  },
  "created_at" : "2012-05-19T01:14:31Z",
  "id" : "1553698571"
}, {
  "type" : "PushEvent",
  "actor" : {
    "avatar_url" : "https://secure.gravatar.com/avatar/05abda697c2654a02391248bed3a5f3e?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
    "url" : "https://api.github.com/users/mbeale",
    "id" : 1507647,
    "gravatar_id" : "05abda697c2654a02391248bed3a5f3e",
    "login" : "mbeale"
  },
  "repo" : {
    "url" : "https://api.github.com/repos/mbeale/gorecurly",
    "id" : 4352662,
    "name" : "mbeale/gorecurly"
  },
  "public" : true,
  "payload" : {
    "head" : "90911f56c2be3cc5229ce22a5588c7440109cbc9",
    "ref" : "refs/heads/master",
    "commits" : [ {
      "distinct" : true,
      "url" : "https://api.github.com/repos/mbeale/gorecurly/commits/90911f56c2be3cc5229ce22a5588c7440109cbc9",
      "author" : {
        "email" : "michael.beale@gmail.com",
        "name" : "Michael Beale"
      },
      "message" : "added tests for acccounts",
      "sha" : "90911f56c2be3cc5229ce22a5588c7440109cbc9"
    } ],
    "size" : 1,
    "push_id" : 79296816
  },
  "created_at" : "2012-05-18T23:35:53Z",
  "id" : "1553683682"
}, {
  "type" : "PushEvent",
  "actor" : {
    "avatar_url" : "https://secure.gravatar.com/avatar/05abda697c2654a02391248bed3a5f3e?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
    "url" : "https://api.github.com/users/mbeale",
    "id" : 1507647,
    "gravatar_id" : "05abda697c2654a02391248bed3a5f3e",
    "login" : "mbeale"
  },
  "repo" : {
    "url" : "https://api.github.com/repos/mbeale/gorecurly",
    "id" : 4352662,
    "name" : "mbeale/gorecurly"
  },
  "public" : true,
  "payload" : {
    "head" : "c6fa36fdaf3200e9d3ef0160c955af4a4350626c",
    "ref" : "refs/heads/master",
    "commits" : [ {
      "distinct" : true,
      "url" : "https://api.github.com/repos/mbeale/gorecurly/commits/c6fa36fdaf3200e9d3ef0160c955af4a4350626c",
      "author" : {
        "email" : "michael.beale@gmail.com",
        "name" : "Michael Beale"
      },
      "message" : "Finished Accounts Functionality",
      "sha" : "c6fa36fdaf3200e9d3ef0160c955af4a4350626c"
    } ],
    "push_id" : 79214199,
    "size" : 1
  },
  "created_at" : "2012-05-18T16:07:42Z",
  "id" : "1553540441"
}, {
  "type" : "PushEvent",
  "actor" : {
    "avatar_url" : "https://secure.gravatar.com/avatar/05abda697c2654a02391248bed3a5f3e?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
    "url" : "https://api.github.com/users/mbeale",
    "id" : 1507647,
    "gravatar_id" : "05abda697c2654a02391248bed3a5f3e",
    "login" : "mbeale"
  },
  "repo" : {
    "url" : "https://api.github.com/repos/mbeale/gorecurly",
    "id" : 4352662,
    "name" : "mbeale/gorecurly"
  },
  "public" : true,
  "payload" : {
    "head" : "5ffd5d45e8fd63e12577dcecc3e38b9095b4fd66",
    "ref" : "refs/heads/master",
    "commits" : [ {
      "distinct" : true,
      "url" : "https://api.github.com/repos/mbeale/gorecurly/commits/5ffd5d45e8fd63e12577dcecc3e38b9095b4fd66",
      "author" : {
        "email" : "michael.beale@gmail.com",
        "name" : "Michael Beale"
      },
      "message" : "initial commit",
      "sha" : "5ffd5d45e8fd63e12577dcecc3e38b9095b4fd66"
    } ],
    "push_id" : 78858542,
    "size" : 1
  },
  "created_at" : "2012-05-16T23:02:16Z",
  "id" : "1552919550"
}, {
  "type" : "CreateEvent",
  "actor" : {
    "avatar_url" : "https://secure.gravatar.com/avatar/05abda697c2654a02391248bed3a5f3e?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
    "url" : "https://api.github.com/users/mbeale",
    "id" : 1507647,
    "gravatar_id" : "05abda697c2654a02391248bed3a5f3e",
    "login" : "mbeale"
  },
  "repo" : {
    "url" : "https://api.github.com/repos/mbeale/gorecurly",
    "id" : 4352662,
    "name" : "mbeale/gorecurly"
  },
  "public" : true,
  "payload" : {
    "master_branch" : "master",
    "description" : "gorecurly",
    "ref" : null,
    "ref_type" : "repository",
    "deeper_nesting" : {
      "return_value" : "success"
    }
  },
  "created_at" : "2012-05-16T22:52:24Z",
  "id" : "1552916813"
} ];
const m = serialize(sample);
console.log('output type', m.__proto__);
console.log('json stringify length', JSON.stringify(sample).length);
console.log('pako + msgpack5 length', m.byteLength);
console.log('is deserialized data an array?', Array.isArray(deserialize(m)));
