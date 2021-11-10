const mongoose = require("mongoose");
const logger= require("../startup/logsUp")(module);
const {validate: validateJ}= require("../util/coreUtil");
const {messageSchema, messageSchemaJ}= require("../schema/messageSchema");

const Message = mongoose.model("Message", messageSchema);

function validate(req) {
    try {
        logger.info(`Validating Message object: `, req);
        return validateJ(req, messageSchemaJ);
    } catch (error) {
        logger.warn(`Message validation failed`, error);
    }
}

function populateMessage(messageObj){
    let keys= Object.keys(messageObj);
    if(keys.length == 0 || keys.length > 1) {
        let validationResult= "Message is empty";
        if(keys.length > 1) validationResult= "Message can only have 1 key";
        return {isSuccess: false, validationResult};
    }
    let key= keys[0];
    let jsDate= new Date();
    let utcDate= new Date(jsDate.toUTCString());
    let message= {
        key,
        timestamp: utcDate,
        value: messageObj[key]
    }
    let validationResult= validate(message);
    if(!validationResult) return {isSuccess: true, message};
    else return {isSuccess: false, validationResult, message};
}

async function save(messageObj) {
    logger.info('Saving Msg object:: ', messageObj);
    let newMessage = new Message(messageObj);
    newMessage= await newMessage.save();
    let {key, value, timestamp: utcJsDate}= newMessage;
    return {key, value, timestamp: utcJsDate.getTime()};
}

async function getByKeyAndTimestamp(key, timestamp) {
    logger.info(`Getting Message by key: [${key}] and timestamp ${timestamp}`);
    let andConditions= [];
    andConditions.push({key});
    let timestampOrder= -1; // descending
    if(timestamp) {
        andConditions.push({timestamp: { $gte: timestamp }});
        timestampOrder= 1; // ascending
    }
    let searchIp= {$and: andConditions};
    let list = await Message.find(searchIp)
        .limit(1)
        .sort({ timestamp: timestampOrder });
    if(list.length===1) {
        let {key, value, timestamp:utcJsDate}= list[0];
        return {key, value, timestamp: utcJsDate.getTime()};
    }
    return null;
}

module.exports = {
    save, getByKeyAndTimestamp, populateMessage,
};
