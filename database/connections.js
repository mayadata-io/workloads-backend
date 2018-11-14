const express = require("express");
const app = express();

const cockroachjiva = require('./cockroach-jiva/databasequery');
const mongojiva = require('./mongo-jiva/databasequery');
const perconajiva = require('./percona-jiva/databasequery');
const mongocstor = require('./mongo-cstor/databasequery');
const perconacstor = require('./percona-cstor/databasequery');
const redisjiva = require('./redis-jiva/databasequery');
const postgresqljiva = require('./postgresql-jiva/databasequery');
const cassandrajiva = require('./cassandra-jiva/databasequery');

app.use('/cockroachdb-jiva', cockroachjiva);
app.use('/mongo-jiva', mongojiva);
app.use('/percona-jiva', perconajiva);
app.use('/mongo-cstor', mongocstor);
app.use('/percona-cstor', perconacstor);
app.use('/redis-jiva', redisjiva);
app.use('/postgresql-jiva', postgresqljiva);
app.use('/cassandra-jiva', cassandrajiva);
module.exports = app;

