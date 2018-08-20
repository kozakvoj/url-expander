'use strict';

require("../../init");

const describe = require("mocha").describe;
const it = require("mocha").it;
const assert = require("assert");

const seomafia = require("../../../lib/shorteners/seomafia")();

describe("seomafia.net", () => {
    it("should resolve to long url", async () => {
        const result = await seomafia("http://seomafia.net/bF6R");

        assert.strictEqual(result, "https://www.vojtechkozak.cz");
    });

    it("should return the same url", async () => {
        const result = await seomafia("http://www.vojtechkozak.cz");

        assert.strictEqual(result, "http://www.vojtechkozak.cz");
    });

    it("should return the same url for non-valid seomafia url", async () => {
        const result = await seomafia("http://seomafia.net/bF6R-xx");

        assert.strictEqual(result, "http://seomafia.net/bF6R-xx");
    });
});
