## Range Requests

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
