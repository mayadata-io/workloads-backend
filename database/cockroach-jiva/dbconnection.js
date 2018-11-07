const async = require('async');
const fs = require('fs');
const pg = require('pg');

const createDb = require('./databasecreatedb');

var config = {
    user: 'root',
    host: 'cockroachdb-public.cockroachdb-jiva' ,
    database: 'maya',
    port: 26257
};
var connection = new pg.Pool(config);

connection.connect(function (err) {
    if (err) {
        console.error("error connecting cockroach " + err);
      } else {
        console.log("cockroach connected as id  " + JSON.stringify( connection));
      }
    });
    
    let createMaya = `create table if not exists person(
        rNumber INT, name VARCHAR,email VARCHAR, age INT
    )`;
    connection.query(createMaya, function(err, results, fields) {
        if (err) {
          console.log("cockroachdb table is not created " + err);
        } else {
          console.log(" cockroachdb table created ..");
        }
      });
module.exports = connection;
