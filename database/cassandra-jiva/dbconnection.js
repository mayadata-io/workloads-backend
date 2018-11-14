const Uuid = require('cassandra-driver').types.Uuid;
const cassandra = require('cassandra-driver');
const PlainTextAuthProvider = cassandra.auth.PlainTextAuthProvider;
const client = new cassandra.Client({ contactPoints:['cassandra-jiva.cassandra:9042'],authProvider: new PlainTextAuthProvider('cassandra', 'cassandra')});

client.connect(function(err) {
    if (!err) {
        console.log("|Cassandra-Jiva Connected . !");
        var query = "CREATE KEYSPACE IF NOT EXISTS maya WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};"
        client.execute(query,function(err) {
        if (!err) {
            console.log("|__> keyspace `maya` created .");
           
            client.execute(`CREATE TABLE IF NOT EXISTS maya.person(id uuid primary key, name text,email text, age INT);`,(err, result) => {
            if (!err) {
                console.log('|___> Table `person` created .');
                }
                else{console.log('Table not created in cassandra-jiva.maya'+ err)}
            });
        }
        else{
            console.log("Error :Keyspace maya doesnot created in Cassandra-jiva : "+ err);
        }
        });
    }
    else{
        console.log('Failed in connecting Cassandra-jiva! :',err)
    }
});

module.exports = client;