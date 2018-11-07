const async = require('async');
const fs = require('fs');
const pg = require('pg');
// Connect to the "bank" database.
var config = {
    user: 'root',
    host: 'cockroachdb-public.cockroachdb-jiva',
    port: 26257
};

// Create a pool.
var connection = new pg.Pool(config);
 
connection.connect(function (err) {
    if (err) {
        console.error('error in connecting cockroachdb-jiva: ' + err);
        return;
      } else {
        console.log('cockroachdb-jiva connected as id' + connection);
        return;
      } 
    });  
    connection.query('create database maya', function (err, results, fields) {
          if (err) {
              console.log('Db not created cockroachdb-jiva ' + err);
          }
          else{console.log('cockroachdb-jiva Db created ..' + results)}
  });  
    

      
