var async = require('async');
var fs = require('fs');
var pg = require('pg');

const createDb = require('./databasecreatedb');


// Connect to the "bank" database.
var config = {
    user: 'root',
    host: 'cockroachdb.cockroachdb-jiva' ,
    database: 'maya',
    port: 26257
};

// Create a pool.
var connection = new pg.Pool(config);

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: cockroach ' + err.stack);
        return;
      }
      console.log('connected as id cockroach ' + connection.threadId);

    
    let createMaya = `create table if not exists person(
        rNumber INT, name VARCHAR,email VARCHAR, age INT
    )`;
    connection.query(createMaya, function (err, results, fields) {
        if (err) {
            console.log(err.message);
        }
        console.log(' cockroachdb table created ..')
    });
});
module.exports = connection;