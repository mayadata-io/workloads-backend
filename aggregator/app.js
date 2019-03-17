const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require('request');


const workloadsApi = require('./api/workloads')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    next();
});



app.use('/workloads',workloadsApi);

module.exports = app;