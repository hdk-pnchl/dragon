const mongoose= require("mongoose");
const logger= require("./logsUp")(module);

module.exports= function(dbConnectionString) {
    mongoose.connect(dbConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=> logger.info(`Connected to DB - '${dbConnectionString}'`));
}