'use strict';

const axios = require("axios");
const R = require("ramda");
const cheerio = require('cheerio');

module.exports = function create(options = []) {
    const timeout = options.timeout || 5000;
    const debug = options.debug || false;

    return function expand(url) {
        if ((url.substr(0, 19) !== 'http://tinyurl.com/') && (url.substr(0, 20) !== 'https://tinyurl.com/')) return url;

        const shortCode = R.pipe(
            R.split("/"),
            R.last
        )(url);

        return axios.create({
            baseURL: `https://preview.tinyurl.com/${shortCode}`,
            timeout,
        })
            .get()
            .then(resp => {
                const $ = cheerio.load(resp.data);

                return $("#contentcontainer blockquote").text()
            })
            .catch((e) => {
                if (debug) console.error(e);
                return url;
            })
    }
};
