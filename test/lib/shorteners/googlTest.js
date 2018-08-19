'use strict';

require("../../init");

const describe = require("mocha").describe;
const it = require("mocha").it;
const assert = require("assert");

const googl = require("../../../lib/shorteners/googl")(process.env.GOOGL_API_KEY);

describe("goo.gl", () => {
    it("should resolve to long url", async () => {
        const result = await googl("https://goo.gl/2gj8kB");

        assert.strictEqual(result, "https://www.vojtechkozak.cz/");
    });

    it("should return the same url [not a goo.gl link]", async () => {
        const result = await googl("http://www.vojtechkozak.cz");

        assert.strictEqual(result, "http://www.vojtechkozak.cz");
    });

    it("should return the same url [invalid goo.gl link]", async () => {
        const result = await googl("http://goo.gl/xxxxx");

        assert.strictEqual(result, "http://goo.gl/xxxxx");
    });
});

//http://goo.gl/xxxxx
