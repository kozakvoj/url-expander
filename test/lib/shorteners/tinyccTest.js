'use strict';

require("../../init");

const describe = require("mocha").describe;
const it = require("mocha").it;
const assert = require("assert");

const tinycc = require("../../../lib/shorteners/tinycc")(process.env.TINYCC_API_LOGIN, process.env.TINYCC_API_KEY);

describe("tiny.cc", () => {
    it("should resolve to long url", async () => {
        const result = await tinycc("http://tiny.cc/7fg5wy");

        assert.strictEqual(result, "https://www.google.com");
    });

    it("should return the same url", async () => {
        const result = await tinycc("http://www.vojtechkozak.cz");

        assert.strictEqual(result, "http://www.vojtechkozak.cz");
    });

    it("should return the same url for non-valid tiny.cc url", async () => {
        const result = await tinycc("http://tiny.cc/7fg5wy-xx");

        assert.strictEqual(result, "http://tiny.cc/7fg5wy-xx");
    });
});
