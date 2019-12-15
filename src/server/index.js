const path = require('path');
const envPath = path.normalize(__dirname + '/../../.env');
require('dotenv').config({ path: envPath });

const createExpressApp = require('./create-express-app');

const mySQLDb = require('./database');

createExpressApp(mySQLDb)
.listen(process.env.PORT, () =>{
    // database = mySQLDb;
    console.log(`Listening on port ${process.env.PORT}....`);
});