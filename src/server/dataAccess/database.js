module.exports = (config) =>{
    const knex = require('knex')(config.MYSQL2);
    return { 
        knex
    };
}