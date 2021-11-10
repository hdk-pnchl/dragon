const winston= require("winston");
const _= require("lodash");

const config = {
    levels: {
        error: 0,
        debug: 1,
        warn: 2,
        data: 3,
        info: 4,
        verbose: 5,
        silly: 6,
        custom: 7
    },
    colors: {
        error: 'red',
        debug: 'blue',
        warn: 'yellow',
        data: 'grey',
        info: 'green',
        verbose: 'cyan',
        silly: 'magenta',
        custom: 'yellow'
    }
};
winston.addColors(config.colors);

const logFormat= winston.format.printf((info)=>{
    let info2 = Object.assign({}, info);
    delete info2.level; delete info2.message; delete info2.timestamp;
    let op= `${info.timestamp} ${info.level} >> ${info.message}`;
    if(!_.isEmpty(info2)){
        op= op+` [${JSON.stringify(info2,null,2)}]`;
    }
    return op;
});

const loggerOptions= {
    levels: config.levels,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({all: true}),
                logFormat
            )
        })
    ],
    level: 'custom'
};

let logger;
function buildLogger() {
    if(!logger) logger= winston.createLogger(loggerOptions);
    return logger;
}
// 1. Express exception - Handling rejected promises - process.on('uncaughtException', error => {});
// 2. Un caught exception - Exception outside of Express
// 3. Unhandled rejection - Failed promise outside of Express - process.on('unhandledRejection', error => {});

module.exports= (module) => {
    let filename = module.id;
    let logger= buildLogger();
    return {
        error: function (msg, vars) {
            logger.error(filename + ' >> ' + msg, vars);
        },
        debug: function (msg, vars) {
            logger.debug(filename + ' >> ' + msg, vars);
        },
        warn: function (msg, vars) {
            logger.warn(filename + ' >> ' + msg, vars);
        },
        data: function (msg, vars) {
            logger.data(filename + ' >> ' + msg, vars);
        },
        info: function (msg, vars) {
            logger.info(`${filename} >> ${msg}`, vars);
        },
        verbose: function (msg, vars) {
            logger.verbose(filename + ' >> ' + msg, vars);
        },
        silly: function (msg, vars) {
            logger.silly(filename + ' >> ' + msg, vars);
        },
        custom: function (msg, vars) {
            logger.custom(filename + ' >> ' + msg, vars);
        }
    }
};