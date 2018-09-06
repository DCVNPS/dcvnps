const bunyan = require('bunyan');


const appname = 'Shopsy';

module.exports = {
  applicationName: appname,
  logger: bunyan.createLogger({ name: appname }),
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
    options: {
      host: '192.168.2.43',
      port: '3306',
      database: 'dcvnps',
      dialect: 'mysql',
      username: 'dcvnps',
      password: 'VnpsR0cks!',
      freezeTableName: true,
      operatorsAliases: false
    }
  },
};
