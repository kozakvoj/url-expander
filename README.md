# URL Expander

Promise based URL expander for Node with multiple supported shorteners.

Core principles:

1) Prefer API - Wherever possible use API provided by shortener services. This way, the best performance can be achieved (It might be about 3x faster then reading redirects).
2) Expand only shorteners that are considered to be safe - Shorteners where people can earn money or hide sexually explicit websites will not be expanded but automatically marked as potentially harmful.

This expander can be best used for user generated content validation together with other tools.

Currently, these shorteners are supported:

- Goo.gl - using API
- Bit.ly - using API
- Seomafia.net - using API
- is.gd - using API
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
const expander = require("url-expander");

const googl = expander.googl("INSERT_API_KEY");
const bitly = expander.bitly("INSERT_API_KEY");
const tinyurl = expander.tinyurl();
const seomafia = expander.seomafia();
const isgd = expander.isgd();

const expand = expander.createExpand([googl, bitly, tinyurl, seomafia, isgd]);

expand("http://bit.ly/gQUgaI"); // -> Promise -> http://bit.ly/bundles/kozakvoj/1
expand("https://goo.gl/2gj8kB"); // -> Promise -> http://www.vojtechkozak.cz
expand("https://tinyurl.com/ycc4x7hn"); // -> Promise -> https://www.vojtechkozak.cz;
expand("https://www.google.com"); // -> Promise -> https://www.google.com;
```

### Example 2
Use only one shortener.

```javascript
const expander = require("url-expander");

const googl = expander.googl("INSERT_API_KEY");

googl("https://goo.gl/2gj8kB"); // -> Promise -> http://www.vojtechkozak.cz
googl("http://bit.ly/gQUgaI"); // -> Promise -> http://bit.ly/gQUgaI
```

## Testing
In order to test the expander, you have to crate a .env file inside /test directory. This file has to contain all API keys for the shortener services.

 ```
GOOGL_API_KEY=
BITLY_API_KEY=
 ```
 
Then execute npm test.

## Reference
- goo.gl API reference: https://developers.google.com/url-shortener/v1/getting_started
- bit.ly API reference: https://dev.bitly.com/links.html
 
 