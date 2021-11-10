const mongoose = require("mongoose");
const Joi = require("joi"); // http request data validation

const messageSchema = new mongoose.Schema({
    key: String,
    value: String,
    timestamp: Date,
});

const messageSchemaJ = Joi.object({
    key: Joi.string().min(2).max(50).allow("").required(),
    value: Joi.string().max(3000).required(),
    timestamp: Joi.date().required(), // Subscription
});

module.exports = {messageSchema, messageSchemaJ}