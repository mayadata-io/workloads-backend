const async = require('async');
const fs = require('fs');
const pg = require('pg');

const createDb = require('./databasecreatedb');


// Connect to the "bank" database.
const config = {
    user: 'root',
    host: 'cockroachdb.cockroachdb-jiva',
    database: 'maya',
    port: 26257,
};

// Create a pool.
const connection = new pg.Pool(config);

connection.connect((err) => {
    if (err) {
        console.error(`error connecting: cockroach ${err.stack}`);
        return;
    }
    console.log(`connected as id cockroach ${connection.threadId}`);


    const createMaya = `create table if not exists person(
        rNumber INT, name VARCHAR,email VARCHAR, age INT
    )`;
    connection.query(createMaya, (err, results, fields) => {
        if (err) {
            console.log(err.message);
        }
        console.log(' cockroachdb table created ..');
    });
});
module.exports = connection;
