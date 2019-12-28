
path = require('path');
const bunyan = require('bunyan');
const appname = 'dcvnps';
const rootdir = path.normalize(`${__dirname}/../`);
const bcrypt = require('bcrypt');
console.log({'rootdir': rootdir});

const logLevel = {
    TRACE: 10,
    DEBUG: 20,
    INFO: 30,
    WARN: 40,
    ERROR: 50,
    FATAL: 60
}
const log = bunyan.createLogger({
    name: `${appname}-log`,
    serializers: {
        req: bunyan.stdSerializers.req,
        res: bunyan.stdSerializers.res,
        err: bunyan.stdSerializers.err
    },
    streams: [
        { stream: process.stdout, level: 'info'},
        {
            level: 'debug',
            name: 'dcvnpslog',
            path: `${rootdir}/logs/dcvnps_error.log`,
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
module.exports = {
    applicationName: appname,
    rootdir: rootdir,
    bcrypt: bcrypt,
    logger: log,
    mySQL:{},
    logResponse: logResponse,
    logLevel: logLevel,
    // mysql: {
    //     database: 'vnps',
    //     username: 'dcvnps',
    //     password: 'vnpsR0cks!',
    //     options: {
    //         host: '192.168.2.9',
    //         port: '3306',
    //         dialect: 'mysql',
    //         freezeTableName: true,
    //         operatorsAliases: false,
    //         underscored: true,
    //     },
    // },
    MYSQL2: { 
        "client": "mysql2", 
        "connection": { 
            "host": "192.168.2.9", 
            "port": "3306", 
            "user": "dcvnps", 
            "password": "vnpsR0cks!", 
            "database": "dcvnps" },
            fetchAsString:['clob']
        }
};
