const express = require("express");
const bodyParser = require("body-parser");
const api = require('./routes/api');
const api1 = require('./routes/personDetails')
const kube = require('./routes/kubernets')
const app = express();
const http = require('request');
const k8s = require('@kubernetes/client-node');


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


app.get('/jiva', (req, res) => {

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
        console.log(data);
        //   numberOfrepo = JSON.parse(body).length;
        console.log("this is volume lis http");
        //    console.log(resp);
        console.log("this is volume lis http");
    }
    // console.log(body +' this is body1')
    res.status(200).json({ data });
});

});


// const Client = require('kubernetes-client').Client;
// const config = require('kubernetes-client').config;
// const client = new Client({ config: config.fromKubeconfig(), version: '1.9' });
// const namespaces = client.api.v1.namespaces.get();
// console.log(namespaces);
// console.log('this is name spaces file')


var k8sApi = k8s.Config.defaultClient();
var namespace = {
    metadata: {
      name: 'test'
    }
  };
  
  k8sApi.createNamespace(namespace).then(
    (response) => {
      console.log('Created namespace');
      console.log(response);
      k8sApi.readNamespace(namespace.metadata.name).then(
        (response) => {
          console.log(response);
          k8sApi.deleteNamespace(
            namespace.metadata.name, {} /* delete options */);
        });
    },
    (err) => {
      console.log('Error!: ' + err);
    }
  );

app.use('/sample', api);
app.use('/person', api1);
app.use('/',kube);
module.exports = app;