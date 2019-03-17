const pg = require('pg');
const async = require('async');

const config = {
  user: 'testuser',
  database: 'userdb',
  password: 'password',
  host: 'pgset-primary.postgresql-jiva',
  port: 5432,
};

const pool = new pg.Pool(config);

pool.connect((err, client, done) => {
    if (err) {
        console.error('could not connect to PostgreSQL jiva', err);
    }else{
        console.log('connected to PostgreSQL jiva');
        async.waterfall([
                (next) => {
                    // Creating  'person' table.
                    client.query('create table if not exists person(rNumber INT, name VARCHAR,email VARCHAR, age INT);', next);
                },
            ],
            (err, results) => {
                if (err) {
                    console.error('Error in Creating Table in PostgreSQL jiva: ', err);
                }
                else{
    
                console.log('Successfully Created Table in PostgreSQL jiva: ',  results);}
                });
    }


});
module.exports = pool;


