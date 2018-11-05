var async = require("async");
var fs = require("fs");
var pg = require("pg");

const createDb = require("./databasecreatedb");

var config = {
  user: "root",
  host: "cockroachdb.cockroachdb-jiva",
  database: "maya",
  port: 26257
};

// Create a pool.
var connection = new pg.Pool(config);

connection.connect(function(err) {
  if (err) {
    console.error("error connecting cockroach " + err.stack);
    return;
  } else {
    console.log("cockroach connected as id  " + connection.threadId);
  }

  let createMaya = `create table if not exists person(
        rNumber INT, name VARCHAR,email VARCHAR, age INT
    )`;
  connection.query(createMaya, function(err, results, fields) {
    if (err) {
      console.log("cockroachdb table is not created " + err.message);
    }
    console.log(" cockroachdb table created ..");
  });
});
module.exports = connection;
