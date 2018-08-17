'use strict';

const googl = require("./lib/shorteners/googl");
const bitly = require("./lib/shorteners/bitly");
const tinyurl = require("./lib/shorteners/tinyurl");

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
    createExpand,
    shorteners: {
        googl, bitly, tinyurl
    }
};