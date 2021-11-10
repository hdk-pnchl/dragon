const express= require("express");
const logger= require("../startup/logsUp")(module);
const Joi = require("joi"); // http request data validation
const {} = require("../util/coreUtil");
const messageService = require("../service/messageService");
const {covertUnixToJsDate}= require("../util/coreUtil");
const router= express.Router();

// list all Messages
router.get("/", async (req, resp)=>{
    logger.info("Listing messages");
    const messages= await messageService.list();
    logger.info(`Returning total of ${messages.length}`);
    resp.send(messages);
});

// Save message
router.post("/", async (req, resp) => {
    let requestBody= req.body;
    logger.info(`Processing message:: `, requestBody);
    let result= messageService.populateMessage(requestBody);
    logger.info(`Message population result:: `, result);
    if(!result.isSuccess) {
        logger.warn(`Received invalid message body`)
        return resp.status(400).send(result.validationResult);
    }
    let message= await messageService.save(result.message);
    logger.info(`Message successfully processed::`, message);
    resp.send(message);
});

// get Message
router.get("/:key", async (req, resp)=>{
    let {key}= req.params;
    let {timestamp}= req.query;
    if(timestamp){
        let dateConversionResult= covertUnixToJsDate(timestamp);
        if(!dateConversionResult.isSuccess) return resp.status(400).send(`Invalid timestamp ${timestamp}`);
        timestamp= dateConversionResult.date;
    }
    logger.info(`Getting message with key [${key}]`);
    const message= await messageService.getByKeyAndTimestamp(key, timestamp);
    if(!message) {
        logger.warn(`Message with key [${key}] not found`);
        return resp.status(404).send(`Message with key [${key}] not found`);
    }
    logger.info(`Returning message`, message);
    resp.send(message);
});

module.exports= router;
