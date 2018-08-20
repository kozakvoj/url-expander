'use strict';

require("../../init");

const describe = require("mocha").describe;
const it = require("mocha").it;
const assert = require("assert");

const tinyurl = require("../../../lib/shorteners/tinyurl")();

describe("tinyurl", () => {
    it("should resolve to long url", async () => {
        const result = await tinyurl("https://tinyurl.com/ycc4x7hn");

        assert.strictEqual(result, "https://www.vojtechkozak.cz");
    });

    it("should return the same url", async () => {
        const result = await tinyurl("http://www.vojtechkozak.cz");

        assert.strictEqual(result, "http://www.vojtechkozak.cz");
    });

    it("should return the same url for non-valid tinyurl.com url", async () => {
        const result = await tinyurl("https://tinyurl.com/ycc4x7hn-xx");

        assert.strictEqual(result, "https://tinyurl.com/ycc4x7hn-xx");
    });
});
