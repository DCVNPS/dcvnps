const path = require('path');
const envPath = path.normalize(__dirname + '/../../.env');
require('dotenv').config({path:envPath});
const config = JSON.parse(process.env.MYSQL2);
const database = require("knex")(config);
const bcrypt = require('bcrypt');

// database.raw("select version()")
// .then((version)=>{console.log(version[0][0]);})
// .catch((err)=>{console.log(err);})
// .finally(()=>{database.destroy();});

const users = require('./users');
const contacts = require('./contacts');
const roles = require('./roles');
const galleries = require('./gallery_data');
const galleryphotos = require('./galleryphotos_data');
const chunkSize = 100;

async function createSeedData(tableName, dataSet) {
  dataSet.forEach((item) => {
    if (item.password) {
      item.password = bcrypt.hashSync(item.password, 10);
    }
    item.createdDate = new Date();
    item.updatedDate = new Date();
  });
  database(tableName)
    .delete()
    .then((r) => { console.log(`Rows effected ${r}`); })
    .catch((err) => { console.log(err); });

  database.batchInsert(tableName, dataSet, chunkSize)
    .then((r) => { console.log(`${r} Inserted`); })
    .catch((error) => console.log(error))
    .finally(() => database.destroy());
}

async function dbConnectOK(db) {
  return db.raw("select version()")
    .then((version) => {
      console.log(version[0][0]);
      return { connectionOK: true };
    })
    .catch((err) => { console.log(err); })
    .finally(()=>db.destroy());
}

// Uncomment the below to Create Initial Application Data
createSeedData('users', users);
// createSeedData('contacts', contacts);
// createSeedData('roles', roles);
// createSeedData('galleries',galleries);
// createSeedData('galleryphotos',galleryphotos);


// async function testDB(database){
//   const dbOK = await dbConnectOK(database);
//   console.log(dbOK);
// }

// testDB(database);