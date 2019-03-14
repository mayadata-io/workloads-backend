
var mysql = require('mysql');
const createDb = require('./databasecreatedb');

var connection = mysql.createConnection({
  host     : 'percona-mysql.percona-jiva',
  port     : '3306',
  user     : 'root',
  password : 'k8sDem0',
  database :  "maya"
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error in connecting perocna-jiva: ' + err.stack);
    return;
  }
  console.log('perocna-jiva connected as id ' + connection.threadId);
});

module.exports = connection;