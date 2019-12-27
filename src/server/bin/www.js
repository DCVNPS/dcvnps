#!/usr/bin/env node

//Dependencies
const path = require('path');
const envPath = path.normalize(__dirname + '/../../../.env');
require('dotenv').config({ path: envPath });
const config = require('../config');
const DB = require('../dataAccess/database')(config);
config.knex = DB.knex;

const createExpressApp = require('../app');

const log = config.logger;
log.level(config.logLevel.DEBUG);

log.info(envPath);

createExpressApp(config).listen(process.env.PORT, () =>{
    console.log(`Listening on port: ${process.env.PORT} ...`);
})