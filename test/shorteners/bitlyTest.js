'use strict';

const describe = require("mocha").describe;
const it = require("mocha").it;
const assert = require("assert");

const bitly = require("../../lib/shorteners/bitly")("key");

describe("bitl.ly", () => {
    it("should resolve to long url", async () => {
        const result = await bitly("http://bit.ly/gQUgaI");

        assert.strictEqual(result, "http://bit.ly/bundles/kozakvoj/1");
    });

    it("should return the same url", async () => {
        const result = await bitly("http://www.vojtechkozak.cz");

        assert.strictEqual(result, "http://www.vojtechkozak.cz");
    });
});
