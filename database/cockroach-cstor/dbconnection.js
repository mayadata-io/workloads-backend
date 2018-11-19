const async = require('async');
const fs = require('fs');
const pg = require('pg');
const config = {
    user: 'root',
    host: 'cockroachdb-public.cockroachdb-cstor',
    port: 26257
};

// Create a pool.
const pool = new pg.Pool(config);

pool.connect((err, client, done) => {
    if (err) {
        console.error('could not connect to cockroachdb', err);
    }
    console.log('connected to CockroachDB ');
    async.waterfall([
            (next) => {
                // Create the 'maya' Database.
                client.query('create database if not exists maya;', next);
            },
            (results, next) => {
                // Creating  'person' table.
                client.query('create table if not exists maya.person(rNumber INT, name VARCHAR,email VARCHAR, age INT);', next);
            },
        ],
        (err, results) => {
            if (err) {
                console.error('Error in Creating DB/Table in CockroachDb: ', err);
            }
            else{

            console.log('Successfully Created DB & Table in CockroachDb');}
            });
});
module.exports = pool;
