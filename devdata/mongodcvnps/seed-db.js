require('dotenv').config();

const users = require('./users');
const contacts = require('./contacts');
const galleries = require('./galleries');
const galleryphotos = require('./gallery.photos');

const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

async function seedCollection(collectionName,initialRecords){
    MongoClient.connect(process.env.DB_CONN, (err, db) =>{
        if(err) {
            console.error(err);
        }
        console.log('connected to mongo db...');

        const collection = db.collection(collectionName);
        collection.remove();

        initialRecords.forEach((item) => {
            if(item.password){
                item.password = bcrypt.hashSync(item.password,10);
            };
            item.createdDate = new Date();
            item.updatedDate = new Date();
        });
        collection.insertMany(initialRecords, (err, result) => {
            console.log(`${result.insertedCount} records inserted`);
            console.log('closing database connection....');
            db.close();
            console.log('done.');
        });
    })
}

// seedCollection('users',users);
// seedCollection('contacts', contacts);
// seedCollection('galleries', galleries);
seedCollection('galleryphotos', galleryphotos );