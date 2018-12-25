var path = require('path');
var winston = require('winston');
const ENV = process.env.NODE_ENV;
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

function getLogger(module) {
    var modulePath = module.filename.split(path.sep).slice(-2).join(path.sep);
    return winston.createLogger({
        levels: config.levels,
        format: winston.format.combine(
            winston.format.label({
                label: modulePath
            }),
            winston.format.colorize(),
            winston.format.timestamp(),
            //winston.format.prettyPrint()
            winston.format.simple()
        ),
        transports: [
            new winston.transports.Console({
                //level : ENV == 'development' ? 'debug' : 'error'
            })
        ],
        level: 'custom'
        // transports : [
        //     new winston.transports.Console({
        //         colorize : true,
        //         level : ENV == 'development' ? 'debug' : 'error',
        //         label : modulePath
        //     })
        // ]
    });
}

module.exports = getLogger;