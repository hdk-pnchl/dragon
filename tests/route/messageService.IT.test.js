let axios= require("axios");
const apiEndpoint= "http://localhost:3000/api/message";
const mongoose = require("mongoose");

describe("Message API", () => {
    let server, app;
    beforeAll(async () => {
        let setup= require("../../app");
        server= setup.server;
        app= setup.app;
    });

    afterAll(async () => {
        server.close(() => {});
        await mongoose.connection.close()
    });

    it("Save", async ()=>{
        let {status, data}= await axios.post(apiEndpoint, {d1: "GOT"});
        expect(status).toBe(200);
    })

    it("Get", async ()=>{
        let {status, data}= await axios.post(apiEndpoint, {d1: "GOT"});
        expect(status).toBe(200);

        let getApiEndPoint= apiEndpoint+"/"+data.key;
        let {status:getMessageByKeyStatus}= await axios.get(getApiEndPoint);
        expect(getMessageByKeyStatus).toBe(200);

        getApiEndPoint= apiEndpoint+"/"+data.key+"?timestamp="+data.timestamp;
        let {status:getMessageByKeyAndTimestampStatus}= await axios.get(getApiEndPoint);
        expect(getMessageByKeyAndTimestampStatus).toBe(200);
    })
});