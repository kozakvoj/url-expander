'use strict';

const axios = require("axios");
const url = require("url");

module.exports = function create(key, options = []) {
    const _key = key;
    const timeout = options.timeout || 5000;
    const debug = options.debug || false;

    return function expand(testUrl) {
        if (url.parse(testUrl).hostname !== "goo.gl") return testUrl;

        return axios.create({
            baseURL: `https://www.googleapis.com/urlshortener/v1/url?shortUrl=${testUrl}&key=${_key}`,
            timeout,
        })
            .get()
            .then(resp => {
                if (resp.data.longUrl === undefined) throw new Error("No data received");

                return resp.data.longUrl
            })
            .catch((e) => {
                if (debug) console.error(e);
                return testUrl;
            })
    }
};
