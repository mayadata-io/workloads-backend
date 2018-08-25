const express = require("express");
const bodyParser = require("body-parser");
const api1 = require('./routes/personDetails');
const api = require('./routes/api');
const podStatus = require('./routes/kub');
const sequenceDiagram = require('./routes/kubesequence');
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

// const k8s = require('@kubernetes/client-node');

// var k8sApi = k8s.Config.defaultClient();
// k8sApi.listNamespacedPod('mongo-jiva')
//     .then((res) => {
//         var overAllStatus = "";
//         var overAllStatusCount = 0;
//         var status = {
//             Running: 0,
//             Pending: 1,
//             Failed: 2,
//             Unknown: 3
//         }
//         var allStatus = {
//             status: String,
//             podStatus :[]
//         }
//         // for (i = 0; i < res.body.items.length; i++) {
//         //     if (res.body.items[i].metadata.ownerReferences[0].kind == 'StatefulSet') {
//         //         console.log('kind : ' + res.body.items[i].metadata.ownerReferences[0].kind);
//         //         console.log('name : ' + res.body.items[i].metadata.name);
//         //         console.log('namespace : ' + res.body.items[i].metadata.namespace);
//         //         console.log('node name : ' + res.body.items[i].spec.nodeName);
//         //         console.log('volume name : ' + res.body.items[i].spec.volumes[0].name);
//         //         console.log('persistentVolumeClaim name : ' + res.body.items[i].spec.volumes[0].persistentVolumeClaim.claimName);
//         //         console.log('status :' + res.body.items[i].status.phase);
//         //     } else if (res.body.items[i].metadata.ownerReferences[0].kind == 'ReplicaSet') {
//         //         console.log('kind : ' + res.body.items[i].metadata.ownerReferences[0].kind);
//         //         console.log('name : ' + res.body.items[i].metadata.name);
//         //         console.log('namespace : ' + res.body.items[i].metadata.namespace);
//         //         if (res.body.items[i].metadata.labels.pvc != undefined && res.body.items[i].metadata.labels.vsm != undefined) {
//         //             console.log('pvc : ' + res.body.items[i].metadata.labels.pvc);
//         //             console.log('vsm : ' + res.body.items[i].metadata.labels.vsm);
//         //         }
//         //         console.log('node name : ' + res.body.items[i].spec.nodeName);
//         //         console.log('status :' + res.body.items[i].status.phase)
//         //     }
//         // }

//         for (i = 0; i < res.body.items.length; i++) {
//             if (status[res.body.items[i].status.phase] >= overAllStatusCount) {
//                 overAllStatusCount = res.body.items[i].status.phase;
//                 allStatus.status = res.body.items[i].status.phase
//             }
//              allStatus.podStatus.push({
//                  name:res.body.items[i].metadata.name,
//                  status: res.body.items[i].status.phase,
//                  kind: res.body.items[i].metadata.ownerReferences[0].kind
//              });

//         }
//         console.log(allStatus);

//     });

app.use('/sample', api);
app.use('/person', api1);
app.use('/pod',podStatus)
app.use('/pods',sequenceDiagram)

module.exports = app;