# URL Expander Tool

Promise based URL expander for Node with multiple supported shorteners.

Core principles:

1) Prefer API - Wherever possible use API provided by shortener services. This way, the best performance can be achieved (It might be about 3x faster then reading redirects).
2) Expand only shorteners that are considered to be safe - Shorteners where people can earn money or hide sexually explicit websites will not be expanded but automatically marked as potentially harmful.

This expander can be best used for user generated content validation together with other tools.

Currently, these shorteners are supported:

- Bit.ly - using API
- Seomafia.net - using API
- Is.gd - using API
- Tiny.cc - using API
- Tinyurl.com - using scrapping from tinyurl.com preview page

These shorteners are recognized: 
- potentially harmful: https://github.com/kozakvoj/url-expander/blob/master/resources/maliciousShorteners.json
- considered to be safe: https://github.com/kozakvoj/url-expander/blob/master/resources/safeShorteners.json

## Installing
Using npm:
```
npm install url-expander
```

## Examples 

### Example 1
Create expand function with multiple shorteners. All other urls will return the same value.

```javascript
const expander = require("url-expander-tool");

const bitly = expander.shorteners.bitly("INSERT_API_KEY");
const tinyurl = expander.shorteners.tinyurl();
const seomafia = expander.shorteners.seomafia();
const isgd = expander.shorteners.isgd();
const tinycc = expander.shorteners.tinyurl("INSERT_LOGIN", "INSET_API_KEY");

const expand = expander.createExpand([bitly, tinyurl, seomafia, isgd, tinycc]);

expand("http://bit.ly/gQUgaI"); // -> Promise -> http://bit.ly/bundles/kozakvoj/1
expand("https://tinyurl.com/ycc4x7hn"); // -> Promise -> https://www.vojtechkozak.cz;
expand("https://www.google.com"); // -> Promise -> https://www.google.com;
```

### Example 2
Use only one shortener service.

```javascript
const expander = require("url-expander-tool");

const bitly = expander.shorteners.bitly("INSERT_API_KEY");

bitly("http://bit.ly/gQUgaI"); // -> Promise -> http://www.vojtechkozak.cz
```

## Testing
In order to test the expander, you have to crate a .env file inside /test directory. This file has to contain all API keys for the shortener services.

 ```
BITLY_API_KEY=
TINYCC_API_KEY=
TINYCC_API_LOGIN=
 ```
 
Then execute npm test.

## Reference
- bit.ly API reference: https://dev.bitly.com/links.html
- seomafia.net API reference: http://seomafia.net/developer.html
- is.gd API reference: https://is.gd/apishorteningreference.php
- tiny.cc API reference: https://tiny.cc/api-docs
 
 
