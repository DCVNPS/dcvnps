// Based on Oloruntobi Allen @https://medium.com/@tobydigz/logging-in-a-node-express-app-with-morgan-and-bunyan-30d9bf2c07a
const bunyan = require('bunyan');
const logLevel = {
    TRACE: 10,
    DEBUG: 20,
    INFO: 30,
    WARN: 40,
    ERROR: 50,
    FATAL: 60
}
const log = bunyan.createLogger({
    name: 'dcvnps-log',
    serializers: {
        req: bunyan.stdSerializers.req,
        res: bunyan.stdSerializers.res,
        err: bunyan.stdSerializers.err
    },
    streams: [
        { stream: process.stdout, level: 'info'},
        {
            name: 'dcvnpslog',
            path: `${__dirname}/logs/dcvnps_error.log`,
            type: 'rotating-file',
            period: '1d',
            count: 3
        }
    ]
});
const logResponse = (id, res) =>{
    this.log = log.child({
        id: id,
        body: res.body,
        statusCode: res.statusCode
    }, true);
    this.log.info('response');
}
module.exports = {log, logResponse, logLevel};