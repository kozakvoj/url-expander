'use strict';

const axios = require("axios");

module.exports = function create(key, options = []) {
    const _key = key;
    const timeout = options.timeout || 5000;
    const debug = options.debug || false;

    return function expand(url) {
        if ((url.substr(0, 14) !== 'http://goo.gl/') && (url.substr(0, 15) !== 'https://goo.gl/')) return url;

        return axios.create({
            baseURL: `https://www.googleapis.com/urlshortener/v1/url?shortUrl=${url}&key=${_key}`,
            timeout,
        })
            .get()
            .then(resp => {
                if (resp.data.longUrl === undefined) throw new Error("No data received");

                return resp.data.longUrl
            })
            .catch((e) => {
                if (debug) console.error(e);
                return url;
            })
    }
};
