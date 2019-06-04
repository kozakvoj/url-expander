'use strict';

const R = require("ramda");

const bitly = require("./lib/shorteners/bitly");
const tinyurl = require("./lib/shorteners/tinyurl");
const seomafia = require("./lib/shorteners/seomafia");
const isgd = require("./lib/shorteners/isgd");
const tinycc = require("./lib/shorteners/tinycc");

const url = require("url");

const containsShorteners = (shortnenerList, testUrl) => R.find(shortener => url.parse(testUrl).hostname === shortener, shortnenerList) !== undefined;

function createExpand(expanders) {
    const _expanders = expanders;

    async function _expand(url, expanders) {
        if (expanders.length === 0) return url;
        const [expnader, ...tail] = expanders;

        const responseUrl = await expnader(url);
        if (responseUrl !== url) return responseUrl;

        return _expand(url, tail)
    }

    return function expand(url) {
        return _expand(url, _expanders);
    }
}


module.exports = {
    isMaliciousShortener: url => containsShorteners(require("./resources/maliciousShorteners"), url),
    isSafeShortener: url => containsShorteners(require("./resources/safeShorteners"), url),
    createExpand,
    shorteners: {
        bitly, tinyurl, seomafia, isgd, tinycc
    }
};