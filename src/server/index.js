const MongoClient = require('mongodb').MongoClient;
const createExpressApp = require('./create-express-app');

require('dotenv').config();

MongoClient.connect(process.env.DB_CONN, (err, db) =>{
    if(err) {
        console.error(err);
        process.exit(1);
    }
    console.log('connected to mongo db...');

    createExpressApp(db)
    .listen(3000, () => {
        database = db;
        console.log('Listening on port 3000.....');
    });
});
