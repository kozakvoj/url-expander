# URL Expander

Promise based URL expander for Node with multiple supported shorteners. Wherever possible it uses API provided by shortener services. This way you can achieve the best performance results (It might be about 3x faster then reading redirects).
 
Currently, these shorteners are supported:

- Goo.gl - using API
- Bit.ly - using API
- Tinyurl.com - using scrapping from tinyurl.com preview page

## Examples 

### Example 1
Create expand function with multiple shorteners. All other urls will return the same value.

```javascript
const expander = require("url-expander");

const googl = expander.googl("INSERT_API_KEY");
const bitly = expander.bitly("INSERT_API_KEY");
const tinyurl = expander.tinyurl();

const expand = expander.createExpand([googl, bitly, tinyurl]);

expand("http://bit.ly/gQUgaI"); // -> Promise -> http://bit.ly/bundles/kozakvoj/1
expand("https://goo.gl/2gj8kB"); // -> Promise -> http://www.vojtechkozak.cz
expand("https://tinyurl.com/ycc4x7hn"); // -> Promise -> https://www.vojtechkozak.cz;
expand("https://www.google.com"); // -> Promise -> https://www.google.com;
```

### Example 2
Use only one shortener.

```javascript
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
 
 