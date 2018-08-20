'use strict';

const axios = require("axios");
const R = require("ramda");
const cheerio = require('cheerio');
const url = require("url");

module.exports = function create(options = []) {
    const timeout = options.timeout || 5000;
    const debug = options.debug || false;

    return function expand(testUrl) {
        if (url.parse(testUrl).hostname !== "tinyurl.com") return testUrl;

        const shortCode = R.pipe(
            R.split("/"),
            R.last
        )(testUrl);

        return axios.create({
            baseURL: `https://preview.tinyurl.com/${shortCode}`,
            timeout,
        })
            .get()
            .then(resp => {
                const $ = cheerio.load(resp.data);

                const myUrl = $("#contentcontainer blockquote").text();

                return myUrl.length === 0 ? testUrl : myUrl;
            })
            .catch((e) => {
                if (debug) console.error(e);
                return testUrl;
            })
    }
};
