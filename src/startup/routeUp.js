const express= require("express");
require("express-async-errors"); // handle unhandled promise rejection.
const messageRoute= require("../route/messageRoute");
const errMW= require("../middleware/errMW");


module.exports= function(app){
    app.use(express.json());
    app.use("/api/message", messageRoute);
    app.use(errMW); //Handling rejected promises 
};