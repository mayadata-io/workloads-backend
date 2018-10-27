const async = require('async');
const fs = require('fs');
const pg = require('pg');
// Connect to the "bank" database.
const config = {
    user: 'root',
    host: 'cockroachdb.cockroach-jiva',
    //    database: 'maya',
    port: 26257,
};

// Create a pool.
const connection = new pg.Pool(config);

connection.connect((err) => {
    if (err) {
        console.error(`error connecting: cockroach${err.stack}`);
        return;
    }
    console.log(`connected as id cockroachdb ${connection.threadId}`);
});
