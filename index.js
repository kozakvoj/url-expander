'use strict';

const R = require("ramda");

const googl = require("./lib/shorteners/googl");
const bitly = require("./lib/shorteners/bitly");
const tinyurl = require("./lib/shorteners/tinyurl");
const url = require("url");

const containsShorteners = (shortnenerList, testUrl) => R.find(shortener => url.parse(testUrl).hostname === shortener, shortnenerList) !== undefined;

function createExpand(expanders) {
    const _expanders = expanders;

    return async function expand(url) {
        if (expanders.length === 0) return url;
        const [expnader, ...tail] = _expanders;

        const responseUrl = await expnader.run(url);
        if (responseUrl !== url) return responseUrl;

        return expand(url, tail)
    }
}


module.exports = {
    isMaliciousShortener: url => containsShorteners(require("./resources/maliciousShorteners"), url),
    isSafeShortener: url => containsShorteners(require("./resources/safeShorteners"), url),
    createExpand,
    shorteners: {
        googl, bitly, tinyurl
    }
};