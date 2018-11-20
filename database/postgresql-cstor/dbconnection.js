const pg = require("pg");
const async = require("async");

const config = {
  user: "testuser",
  database: "userdb",
  password: "password",
  host: "pgset.postgresql-cstor",
  port: 5432
};

const pool = new pg.Pool(config);

pool.connect((err, client, done) => {
  if (err) {
    console.error("could not connect to PostgreSQL cstor", err);
  } else {
    console.log("connected to PostgreSQL cstor");
    async.waterfall(
      [
        next => {
          // Creating  'person' table.
          client.query(
            "create table if not exists person(rNumber INT, name VARCHAR,email VARCHAR, age INT);",
            next
          );
        }
      ],
      (err, results) => {
        if (err) {
          console.error("Error in Creating Table in PostgreSQL cstor: ", err);
        } else {
          console.log(
            "Successfully Created Table in PostgreSQL cstor: ",
            results
          );
        }
      }
    );
  }
});
module.exports = pool;
