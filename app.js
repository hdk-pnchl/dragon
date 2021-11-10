const express= require("express");
var cors= require("cors");
require('dotenv').config();
const helmet= require("helmet"); // basic security headers
const compression= require('compression');
// TODO:: Add http wire logs
const morgan= require('morgan'); //log http request
const config= require("config");
const logger= require("./src/startup/logsUp")(module);

// Exceptions
process.on("unhandledRejection", error => {
    logger.error(error);
});
process.on("uncaughtException", error => {
    logger.error(error);
});

// Startups
const setupRoutes= require("./src/startup/routeUp");
const setupDB= require("./src/startup/dbUp");

// Express server
const app= express();

// Middlerwares
app.use(helmet()); //security
app.use(compression()); // response compression
app.use(morgan("combined")); // http logs
app.use(cors({ // CORS
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));

// Setup
setupRoutes(app); //handling all routes
const dbConnectionString= config.get("connectionString");
setupDB(dbConnectionString); //mongoos DB connection to MongoDB.

// Start Server
const port= config.get("port");
const appName= config.get("name");
const server= app.listen(port, () => {
    logger.info(`'${appName}' Server started at port ${port}`)
});

module.exports= {app, server};