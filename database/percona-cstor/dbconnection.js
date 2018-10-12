
var mysql = require('mysql');
const createDb = require('./databasecreatedb');

var connection = mysql.createConnection({
  host     : `${process.argv[2]}`,
  port     : '3306',
  user     : 'root',
  password : `${process.argv[3]}`,
  database :  "maya"
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

module.exports = connection;