const coreUtil = require("../../src/util/coreUtil");
const {messageSchemaJ} = require("../../src/schema/messageSchema");

describe("Core Util TESTS", () => {
    beforeAll(async () => {
    });

    it("validate", async ()=>{
        let messageObj= {};
        let validationResult= coreUtil.validate(messageObj, messageSchemaJ);
        expect(validationResult).toBeTruthy();

        messageObj= {
            key: "key",
            value:"value",
            timestamp: "2021-11-09T12:23:47.049Z"
        };
        validationResult= coreUtil.validate(messageObj, messageSchemaJ);
        expect(validationResult).toBeNull();

        messageObj= {
            key1: "key",
            value:"value",
            timestamp: "2021-11-09T12:23:47.049Z"
        };
        validationResult= coreUtil.validate(messageObj, messageSchemaJ);
        expect(validationResult).toBe('"key" is required. ');

        messageObj= {
            key: "key",
            value1:"value",
            timestamp: "2021-11-09T12:23:47.049Z"
        };
        validationResult= coreUtil.validate(messageObj, messageSchemaJ);
        expect(validationResult).toBe('"value" is required. ');

        messageObj= {
            key: "key",
            value:"value",
            timestamp1: "2021-11-09T12:23:47.049Z"
        };
        validationResult= coreUtil.validate(messageObj, messageSchemaJ);
        expect(validationResult).toBe('"timestamp" is required. ');

        messageObj= {
            key1: "key",
            value:"value",
            timestamp1: "2021-11-09T12:23:47.049Z"
        };
        validationResult= coreUtil.validate(messageObj, messageSchemaJ);
        expect(validationResult).toBe('"key" is required. ');
    });

    it("buildValidationResult", async ()=>{
        let validationResult={
            error: {}
        };
        validationResult.error.message= '"key" is required. ';
        let result= coreUtil.buildValidationResult(validationResult);
        expect(result).toBe('"key" is required. ');

        validationResult.error.details= [];
        validationResult.error.details.push({message: '"key" is required'});
        result= coreUtil.buildValidationResult(validationResult);
        expect(result).toBe('"key" is required. ');
    });
});