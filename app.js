const express = require("express");
const bodyParser = require("body-parser");
const api = require('./routes/api');
const api1 = require('./routes/personDetails')
const kube = require('./routes/kubernets')
const app = express();
const http = require('request');
// const k8s = require('@kubernetes/client-node');


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
const k8s = require('@kubernetes/client-node');

var k8sApi = k8s.Config.defaultClient();
k8sApi.listNamespacedPod('mongo-jiva')
   .then((res) => {
       console.log(res.body.items);
   });

// const Client = require('kubernetes-client').Client;

// async function main() {
//     console.log(process.env.K8S_CLUSTER_HOST)
//     console.log(process.env.K8S_USER)
//     console.log(process.env.K8S_PASSWORD)

//     try {
//         const client = new Client({
//             config: {
//                 url: process.env.K8S_CLUSTER_HOST,
//                 auth: {
//                     user: process.env.K8S_USER,
//                     pass: process.env.K8S_PASSWORD
//                 },
//                 insecureSkipTlsVerify: true
//             },
//             version: process.env.K8S_CLUSTER_VERSION
//         });

//         //
//         // Fetch all the pods
//         const pods = await client.api.v1.pods.get();
//         pods.body.items.forEach((item) => {
//             console.log(item.metadata);
//         });

//         //
//         // Fetch the Deployment from the kube-system namespace.
//         //
//         const deployment = await client.apis.apps.v1.namespaces('kube-system').deployments().get();
//         deployment.body.items.forEach((item) => {
//             console.log(item.metadata);
//         });

//     } catch (err) {
//         console.error('Error: ', err);
//     }
// }

// main();



// const Client = require('kubernetes-client').Client;
// const client = new Client({
//     config: {
//         url: 'https://35.226.103.206',
//         auth: {
//             user: 'admin',
//             pass: '4NGNyLBzcN7uoKAJ',
//         },
//         insecureSkipTlsVerify: true,
//     }
// })

app.use('/sample', api);
app.use('/person', api1);
app.use('/', kube);
module.exports = app;