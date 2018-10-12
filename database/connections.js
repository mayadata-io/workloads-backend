const express = require("express");
const app = express();

// const cockroachjiva = require('./cockroach-jiva/databasequery');
const mongojiva = require('./mongo-jiva/databasequery');
// const perconajiva = require('./percona-jiva/databasequery');
const mongocstor = require('./mongo-cstor/databasequery');
// const perconacstor = require('./percona-cstor/databasequery');

// app.use('cockroach-jiva', cockroachjiva);
app.use('/mongo-jiva', mongojiva);
// app.use('percona-jiva', perconajiva);
app.use('/mongo-cstor', mongocstor);
// app.use('percona-cstor', perconacstor)
module.exports = app;

