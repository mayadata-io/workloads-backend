
var mysql = require('mysql');
const createDb = require('./databasecreatedb');

var connection = mysql.createConnection({
  host     : 'percona-mysql.percona-cstor',
  port     : '3306',
  user     : 'root',
  password : 'k8sDem0',
  database :  "maya"
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error in connecting percona-cstor: ' + err.stack);
    return;
  }
  console.log('percona-cstor connected as id ' + connection.threadId);
});

module.exports = connection;