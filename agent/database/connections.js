const express = require("express");
const app = express();

// jiva appliaction

// const mongojiva = require('./mongo-jiva/databasequery');
// const perconajiva = require('./percona-jiva/databasequery');
// const cockroachjiva = require('./cockroach-jiva/databasequery');
// const redisjiva = require('./redis-jiva/databasequery');
// const postgresqljiva = require('./postgresql-jiva/databasequery');

// cstor application

// const mongocstor = require('./mongo-cstor/databasequery');
const perconacstor = require('./percona-cstor/databasequery');
// const cockroachcstor = require('./cockroach-cstor/databasequery');
// const rediscstor = require('./redis-cstor/databasequery');
// const postgresqlcstor = require('./postgresql-cstor/databasequery');

//jiva application

// app.use('/mongo-jiva', mongojiva);
// app.use('/percona-jiva', perconajiva);
// app.use('/cockroachdb-jiva', cockroachjiva);
// app.use('/redis-jiva', redisjiva);
// app.use('/postgresql-jiva', postgresqljiva);


//cstor application
// app.use('/mongo-cstor', mongocstor);
app.use('/percona-cstor', perconacstor);
// // app.use('/cockroachdb-cstor', cockroachcstor);
// app.use('/redis-cstor', rediscstor);
// app.use('/postgresql-cstor', postgresqlcstor);

module.exports = app;

