'use strict';

require("./init");

const describe = require("mocha").describe;
const it = require("mocha").it;
const assert = require("assert");

const expander = require("./../index");

describe("createExpand", async () => {
    it("should return correct expanded value", async () => {
        const bitly = expander.shorteners.bitly(process.env.BITLY_API_KEY);
        const tinyurl = expander.shorteners.tinyurl();
        const seomafia = expander.shorteners.seomafia();
        const isgd = expander.shorteners.isgd();
        const tinycc = expander.shorteners.tinyurl(process.env.TINYCC_API_LOGIN, process.env.TINYCC_API_KEY);

        const expand = expander.createExpand([bitly, tinyurl, seomafia, isgd, tinycc]);

        const expandedValue = await expand("http://bit.ly/gQUgaI");
        assert.strictEqual(expandedValue, "http://bit.ly/bundles/kozakvoj/1");

        const expandedValue2 = await expand("http://www.zionmag.org");
        assert.strictEqual(expandedValue2, "http://www.zionmag.org");

    });
});

describe("isMaliciousShortener", () => {
    it("should return false for not malicious shortener", async () => {
        const isMaliciousShortener1 = expander.isMaliciousShortener("https://bit.ly/abc");
        const isMaliciousShortener2 = expander.isMaliciousShortener("http://bit.ly/abc");

        assert.strictEqual(isMaliciousShortener1, false);
        assert.strictEqual(isMaliciousShortener2, false);
    });

    it("should return true for malicious shortener", async () => {
        const isMaliciousShortener1 = expander.isMaliciousShortener("https://adf.ly/abc");
        const isMaliciousShortener2 = expander.isMaliciousShortener("http://adf.ly/abc");

        assert.strictEqual(isMaliciousShortener1, true);
        assert.strictEqual(isMaliciousShortener2, true);
    });

    it("should return false for url that is not a shortener", async () => {
        const isMaliciousShortener1 = expander.isMaliciousShortener("https://www.vojtechkozak.cz");
        const isMaliciousShortener2 = expander.isMaliciousShortener("http://www.vojtechkozak.cz");

        assert.strictEqual(isMaliciousShortener1, false);
        assert.strictEqual(isMaliciousShortener2, false);
    });
});

describe("isSafeShortener", () => {
    it("should return true for not malicious shortener", async () => {
        const isMaliciousShortener1 = expander.isSafeShortener("https://bit.ly/abc");
        const isMaliciousShortener2 = expander.isSafeShortener("http://bit.ly/abc");

        assert.strictEqual(isMaliciousShortener1, true);
        assert.strictEqual(isMaliciousShortener2, true);
    });

    it("should return false for malicious shortener", async () => {
        const isMaliciousShortener1 = expander.isSafeShortener("https://adf.ly/abc");
        const isMaliciousShortener2 = expander.isSafeShortener("http://adf.ly/abc");

        assert.strictEqual(isMaliciousShortener1, false);
        assert.strictEqual(isMaliciousShortener2, false);
    });

    it("should return false for url that is not a shortener", async () => {
        const isMaliciousShortener1 = expander.isSafeShortener("https://www.vojtechkozak.cz");
        const isMaliciousShortener2 = expander.isSafeShortener("http://www.vojtechkozak.cz");

        assert.strictEqual(isMaliciousShortener1, false);
        assert.strictEqual(isMaliciousShortener2, false);
    });
});

