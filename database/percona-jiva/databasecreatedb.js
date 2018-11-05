var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'percona-mysql.percona-jiva',
  port: '3306',
  user: 'root',
  password: 'k8sDem0',
});

var connectWithRetry = function () {
 return connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      setTimeout(connectWithRetry, 5000);
      return;  
    }
    connection.query("CREATE DATABASE if not exists maya", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });
}
connectWithRetry();
module.exports = connection;