const express = require("express");
const bodyParser = require("body-parser");
const api = require('./routes/api');
const api1 = require('./routes/personDetails')
const app = express();
const http = require('request');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    next();
});

var options = {
    url: 'https://api.github.com/users/inyee786',
    method: 'GET',
    headers: {
        'User-Agent': 'request'
    }
};

http.get(options, function (err, resp, body) {
    if (err) {
        //   reject(err);
        console.log(err);
    } else {
        data = JSON.parse(body);
        //   numberOfrepo = JSON.parse(body).length;
        console.log(data);
    }
});



var options = {
    url: `http://${process.argv[4]}:5656/latest/volumes/`,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};

http.get(options, function (err, resp, body) {
    if (err) {
        //   reject(err);
        console.log(err);
        console.log("this is volume erro namespaces ");
    } else {
        data = JSON.parse(body);
        console.log(body);
        //   numberOfrepo = JSON.parse(body).length;
        console.log("this is volume lis http");
        //    console.log(resp);
        console.log("this is volume lis http");
    }
    // console.log(body +' this is body1')
});



app.use('/sample', api);
app.use('/person', api1);
module.exports = app;