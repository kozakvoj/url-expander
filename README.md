# URL Expander

URL expander with multiple supported shorteners. Currently, these shorteners are supported:

- Goo.gl
- Bit.ly
- Tinyurl.com

##Examples 

###Example 1
Create expand function with multiple shorteners. All other urls will return the same value.

```javascript
const expander = require("url-expander");

const googl = expander.googl("INSERT_API_KEY");
const bitly = expander.bitly("INSERT_API_KEY");
const tinyurl = expander.tinyurl();

const expand = expander.createExpand([googl, bitly, tinyurl]);

expand("http://bit.ly/gQUgaI"); // -> http://bit.ly/bundles/kozakvoj/1
expand("https://goo.gl/2gj8kB"); // -> http://www.vojtechkozak.cz
expand("https://tinyurl.com/ycc4x7hn"); // -> https://www.vojtechkozak.cz;
expand("https://www.google.com"); // -> https://www.google.com;
```

###Example 2
Use only one shortener.

```javascript
const googl = expander.googl("INSERT_API_KEY");

googl("https://goo.gl/2gj8kB"); // -> http://www.vojtechkozak.cz
googl("http://bit.ly/gQUgaI"); // -> http://bit.ly/gQUgaI
```