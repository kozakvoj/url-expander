'use strict';

require("../../init");

const describe = require("mocha").describe;
const it = require("mocha").it;
const assert = require("assert");

const isgd = require("../../../lib/shorteners/isgd")();

describe("is.gd", () => {
    it("should resolve to long url", async () => {
        const result = await isgd("https://is.gd/T1flx2");

        assert.strictEqual(result, "https://www.vojtechkozak.cz");
    });

    it("should return the same url", async () => {
        const result = await isgd("http://www.vojtechkozak.cz");

        assert.strictEqual(result, "http://www.vojtechkozak.cz");
    });
});
