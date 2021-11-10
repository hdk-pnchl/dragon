const mongoose = require("mongoose");
const messageService = require("../../src/service/messageService");
const logger= require("../../src/startup/logsUp")(module);

describe("Message service TESTS", () => {
    beforeAll(async () => {
        let timestamp= new Date().getTime();
        let dbConnectionString= "mongodb://localhost/vd_test_"+timestamp;
        mongoose.connect(dbConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=> logger.info(`Connected to DB - '${dbConnectionString}'`));
    });

    afterAll(async () => {
        await mongoose.connection.close()
    });

    it("populateMessage", async ()=>{
        let ipMessage= {name: "Rhaegal"};
        let result= messageService.populateMessage(ipMessage);
        expect(result.isSuccess).toBeTruthy();
        expect(result.message.key).toBe("name");
        expect(result.message.value).toBe("Rhaegal");

        ipMessage= {name: "Rhaegal", name2: "Viserion"};
        result= messageService.populateMessage(ipMessage);
        expect(result.isSuccess).toBeFalsy();

        ipMessage= {};
        result= messageService.populateMessage(ipMessage);
        expect(result.isSuccess).toBeFalsy();

        ipMessage= {name: 123};
        result= messageService.populateMessage(ipMessage);
        expect(result.isSuccess).toBeFalsy();
    });

    it("save", async ()=>{
        let jsDate= new Date();
        let utcDate= new Date(jsDate.toUTCString());
        let ipMessage= {
            "key": "value",
            "timestamp": utcDate,
            "value": "123",
        }
        let message= await messageService.save(ipMessage);
        expect(message).toBeTruthy();
        expect(message.key).toBe("value");
    });

    it("getByKeyAndTimestamp", async ()=>{
        // Save
        let ipMessage= {name: "Rhaegal"};
        let result= messageService.populateMessage(ipMessage);
        let message= await messageService.save(result.message);
        expect(result.isSuccess).toBeTruthy();

        // Fetched saved
        let fetchMessage= await messageService.getByKeyAndTimestamp("name");
        expect(fetchMessage).toBeTruthy();

        // Update message
        ipMessage= {name: "Viserion"};
        result= messageService.populateMessage(ipMessage);
        await messageService.save(result.message);
        expect(result.isSuccess).toBeTruthy();

        // Fetch by Update
        let fetchMessageUpdated = await messageService.getByKeyAndTimestamp("name");
        expect(fetchMessageUpdated).toBeTruthy();
        expect(fetchMessageUpdated.value).toBe("Viserion");


        // Fetch by timestamp
        let fetchMessageByTimestamp = await messageService.getByKeyAndTimestamp("name", message.timestamp);
        expect(fetchMessageByTimestamp).toBeTruthy();
        expect(fetchMessageByTimestamp.value).toBe("Rhaegal");
    });
});