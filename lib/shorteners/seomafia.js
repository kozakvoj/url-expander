'use strict';

const axios = require("axios");
const url = require("url");
const R = require("ramda");

module.exports = function create(options = []) {
    const timeout = options.timeout || 5000;
    const debug = options.debug || false;

    return function expand(testUrl) {
        if (url.parse(testUrl).hostname !== "seomafia.net") return testUrl;

        const shortCode = R.pipe(
            R.split("/"),
            R.last
        )(testUrl);

        return axios.create({
            baseURL: `http://seomafia.net/API/read/get?id=${shortCode}&type=json`,
            timeout,
        })
            .get()
            .then(resp => {
                if (resp.data.success === undefined) throw new Error("No data received");
                if (resp.data.success) {
                    return resp.data.data.full;
                } else {
                    return testUrl;
                }
            })
            .catch((e) => {
                if (debug) console.error(e);
                return testUrl;
            })
    }
};
