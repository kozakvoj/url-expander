'use strict';

const axios = require("axios");
const url = require("url");

module.exports = function create(options = []) {
    const timeout = options.timeout || 5000;
    const debug = options.debug || false;

    return function expand(testUrl) {
        if (url.parse(testUrl).hostname !== "is.gd") return testUrl;

        return axios.create({
            baseURL: `https://is.gd/forward.php?format=json&shorturl=https://is.gd/${testUrl}`,
            timeout,
        })
            .get()
            .then(resp => {
                if (resp.data.url === undefined) throw new Error("No data received");

                return resp.data.url;
            })
            .catch((e) => {
                if (debug) console.error(e);
                return testUrl;
            })
    }
};
