'use strict';

const axios = require("axios");

module.exports = function create(key, options = []) {
    const _key = key;
    const timeout = options.timeout || 5000;
    const debug = options.debug || false;

    return function expand(url) {
        if ((url.substr(0, 14) !== 'http://bit.ly/') && (url.substr(0, 15) !== 'https://bit.ly/')) return url;

        return axios.create({
            baseURL: `https://api-ssl.bitly.com/v3/expand?access_token=${_key}&shortUrl=${url}`,
            timeout,
        })
            .get()
            .then(resp => {
                if (resp.data.data === undefined
                    || resp.data.data.expand === undefined
                    || resp.data.data.expand.length < 1) throw new Error("No data received");

                return resp.data.data.expand[0].long_url
            })
            .catch((e) => {
                if (debug) console.error(e);
                return url;
            })
    }
};
