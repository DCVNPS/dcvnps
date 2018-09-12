const bunyan = require('bunyan');


const appname = 'Dcvnps';

const log = bunyan.createLogger({ name: appname });
module.exports = {
  applicationName: appname,
  logger: log,
  logLevel: 'info',
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
      underscored: true,
    },
  },
};
