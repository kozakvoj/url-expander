'use strict';

const axios = require("axios");
const url = require("url");

module.exports = function create(key, options = []) {
    const _key = key;
    const timeout = options.timeout || 5000;
    const debug = options.debug || false;

    return function expand(testUrl) {
        if (url.parse(testUrl).hostname !== "bit.ly") return testUrl;

        return axios.create({
            baseURL: `https://api-ssl.bitly.com/v3/expand?access_token=${_key}&shortUrl=${testUrl}`,
            timeout,
        })
            .get()
            .then(resp => {
                if (resp.data.data === undefined
                    || resp.data.data.expand === undefined
                    || resp.data.data.expand.length < 1) throw new Error("No data received");

                if (resp.data.data.expand[0].error !== undefined && resp.data.data.expand[0].error === "NOT_FOUND")
                    return testUrl;

                return resp.data.data.expand[0].long_url
            })
            .catch((e) => {
                if (debug) console.error(e);
                return testUrl;
            })
    }
};
