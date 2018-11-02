var pg = require("pg");
var config = {
    user: 'testuser',
    database: 'userdb', 
    password: 'password', 
    host: '172.17.0.18',
    port: 5432, 
    max: 10, // max number of connection can be open to database
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
  	
var pool = new pg.Pool(config);
pool.connect(function(err,client,done) {
   if(err){
       console.log("not able to get connection "+ err)}
    else{console.log('connected to postgresql')}
   });

pool.query("CREATE TABLE IF NOT EXISTS person(rNumber INT, name VARCHAR,email VARCHAR, age INT)", (err, result) => {
    if (err){
        console.log('Table not created '+ err);
    }else{console.log('table created.. ')}
    
    });
    

    module.exports = pool;