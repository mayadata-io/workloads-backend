const async = require('async');
const fs = require('fs');
const pg = require('pg');

var config = {
    user: 'root',
    host: 'cockroachdb-public.cockroach-jiva',
    port: 26257
};

// Create a pool.
var connection = new pg.Pool(config);

connection.connect(function (err) {
    if (err) {
        console.error('error in connecting cockroachdb-jiva: ' + err.stack);
        return;
      } else {
        console.log('cockroachdb-jiva connected as id' + connection.threadId);
      } 
    });  
    connection.query(' cockroachdb-jiva  create database maya', function (err, results, fields) {
      if (err) {
          console.log('cockroachdb-jiva  Db not created ' +err.message);
          return;
      }else{
        console.log('ckroachdb-jiva Db created ..')
        }
  });  
    

      