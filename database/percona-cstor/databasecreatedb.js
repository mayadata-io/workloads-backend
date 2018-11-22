var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'percona-mysql.percona-cstor',
  port: '3306',
  user: 'root',
  password: 'k8sDem0',
});

var connectWithRetry = function () {
 return connection.connect(function (err) {
    if (err) {
      console.error('error in connecting percona-cstor: ' + err.stack);
      // setTimeout(connectWithRetry, 5000);
      return;  
    }
    connection.query("CREATE DATABASE if not exists maya", function (err, result) {
      if (err) throw err;
      console.log("Database created in percona-cstor");
    });
  });
}
connectWithRetry();
module.exports = connection;