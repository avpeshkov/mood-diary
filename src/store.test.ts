import { getLocalMiddleware } from "src/store";

describe("store utils test", () => {
    const { logger } = require(`redux-logger`);
    test("getMiddleware", async () => {
        expect(getLocalMiddleware("development")).toContain(logger);
        expect(getLocalMiddleware(undefined)).not.toContain(logger);
    });
});
