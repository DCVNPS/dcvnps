const bunyan = require('bunyan');


const appname = 'Dcvnps';

const log = bunyan.createLogger({ name: appname });
module.exports = {
  applicationName: appname,
  logger:log,
  logLevel:'info',
  // mongodb: {
  //   name: 'Node Learner',
  //   dsn: 'mongodb://nodelearner:Ind!vidual1@ds149309.mlab.com:49309/learnnode',
  //   options: {
  //     useNewUrlParser: true,
  //   },
  // },
  redis: {
    url: 'redis://192.168.2.43:6379'
  },
  mysql: {
    database: 'dcvnps',
    username: 'dcvnps',
    password: 'VnpsR0cks!',
  options: {
      host: '192.168.2.43',
      port: '3306',
      dialect: 'mysql',
      freezeTableName: true,
      operatorsAliases: false,
      sync: false,
    }
  },
};
