const logger= require("../startup/logsUp")(module);

// Handling rejected promises
module.exports= function(err, req, resp, next){
    logger.error(`Req FAILED - Handling rejected promises:`, err);
    resp.status(500).send(err.message);
}