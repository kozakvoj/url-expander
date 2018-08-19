'use strict';

const axios = require("axios");
const url = require("url");
const R = require("ramda");

module.exports = function create(login, apiKey, options = []) {
    const timeout = options.timeout || 5000;
    const debug = options.debug || false;

    return function expand(testUrl) {
        if (url.parse(testUrl).hostname !== "tiny.cc") return testUrl;

        const shortCode = R.pipe(
            R.split("/"),
            R.last
        )(testUrl);

        return axios.create({
            baseURL: `https://tiny.cc/?c=rest_api&m=expand&version=2.0.3&format=json&hash=${shortCode}&login=${login}&apiKey=${apiKey}`,
            timeout,
        })
            .get()
            .then(resp => {
                if (resp.data.errorCode === undefined) throw new Error("No data received");
                if (resp.data.statusCode === "OK" && resp.data.results !== undefined) {
                    return resp.data.results.longUrl;
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
