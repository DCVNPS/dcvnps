
import * as path from 'path';
import * as bunyan from 'bunyan';
import * as knex from 'knex';
import * as uuidv4 from 'uuid/v4';
const appname = 'dcvnps';
const rootdir = path.normalize(`${__dirname}/../`);
import * as bcrypt from 'bcrypt';
// console.log({'rootdir': rootdir});

export const logLevel = {
    TRACE: 10,
    DEBUG: 20,
    INFO: 30,
    WARN: 40,
    ERROR: 50,
    FATAL: 60
};
export const log = bunyan.createLogger({
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
export const logResponse = (id, res) => {
    this.log = log.child({
        id: id,
        body: res.body,
        statusCode: res.statusCode
    }, true);
    this.log.info('response');
};

export class Config {
    public applicationName: string = appname;
    public rootdir: string = rootdir;
    public bcrypt = bcrypt;
    public logger = log;
    public uuidv4 = uuidv4;
    public mySQL = {};
    public logResponse = logResponse;
    public logLevel = logLevel;
    public MYSQL2 = {
        'client': 'mysql2',
        'connection': {
            'host': '192.168.2.17',
            'port': '3306',
            'user': 'dcvnpsor_dcvnps',
            'password': 'vnpsR0cks!23',
            'database': 'dcvnpsor_dcvnps' },
            fetchAsString: ['clob']
        };
    constructor(  ) {
        this.mySQL = knex(this.MYSQL2);
    }
}
// export default new Config();
