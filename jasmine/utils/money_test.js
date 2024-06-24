import { format_currency } from "../../scripts/utils/money.js";

describe("test suite: format currency", () => {
    it("convert cents into dollars", () => {
        expect(format_currency(2095)).toEqual("20.95");
    });
});

