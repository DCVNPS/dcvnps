#!/usr/bin/env node

//Dependencies
const path = require('path');
const envPath = path.normalize(__dirname + '/../../../.env');
require('dotenv').config({ path: envPath });
const config = require('../config');
const DB = require('../dataAccess/database')(config);
config.mySQL = DB.knex;

// console.log({'evnPath':envPath, 'jwt-secret': process.env.JWT_SECRET});

const http = require('http');
const App = require('../app');

// prepare log agent.
const log = config.logger;
// log.level(config.logLevel.INFO);

/* Logic to start the application */
const app = App(config);
const port = process.env.PORT || 0;
app.set('port', port);
// Create http server object
const server = http.createServer(app);

/************ Begin Server events handling *************/
function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = typeof port === 'string'
      ? `Pipe ${port}`
      : `Port  ${port}`;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        log.fatal(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        log.fatal(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  
  function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? `pipe ${addr}`
      : `port ${addr.port}`;
      const msg = `${config.applicationName} listening on ${bind}`;
      console.log(msg);
      log.info(msg);
  }
/************ End Server events handling *************/
server.listen(port);
server.on('error',onError);
server.on('listening', onListening);