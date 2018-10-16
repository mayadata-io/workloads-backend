const express = require("express");
const router = express();
const http = require('request');


const nameSpaces = `mongo-jiva`;
const mayaapiIp = `${process.argv[6]}`;
const applicationDeployedNamespaces = `mongo-jiva`;

var options = {
    url: `http://maya-apiserver-service.openebs:5656/latest/volumes/`,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'namespace': nameSpaces
    }
};
console.log(options);

for (i = 0; i < process.argv.length; i++) {
    console.log(process.argv[i]);
}

http.get(options, function (err, resp, body) {
    var mayaVolume = [];
    if (err) {
        console.log("this is volume erro namespaces ");
    } else {
        data = JSON.parse(body);
        console.log(JSON.stringify(data.items));
        console.log("this is volume lis http");
        console.log(data);

        for (i = 0; i < data.items.length; i++) {
            if (data.items[i].metadata.name.includes(nameSpaces)){
                mayaVolume.push({
                    name: data.items[i].metadata.name,
                    size: data.items[i].metadata.annotations['openebs.io/volume-size'],
                    status: data.items[i].metadata.annotations['openebs.io/controller-status'],
                    replicas: data.items[i].metadata.annotations['vsm.openebs.io/replica-count'],
                    kind: data.items[i].kind,
                    castype: data.items[i].spec.casType
                });
            }
        }
        console.log(mayaVolume);
    }
});

router.get('/volume', (req, res) => {
    var mayaVolume = [];
    var options = {
        url: `http://maya-apiserver-service.openebs:5656/latest/volumes/`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'namespace': req.query.workloadname+'-'+req.query.openebsengine
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

            for (i = 0; i < data.items.length; i++) {
                if (data.items[i].metadata.name.includes(req.query.workloadname) && data.items[i].metadata.name.includes(req.query.openebsengine)){
                    mayaVolume.push({
                        name: data.items[i].metadata.name,
                        size: data.items[i].metadata.annotations['openebs.io/volume-size'],
                        status: data.items[i].metadata.annotations['openebs.io/controller-status'],
                        replicas: data.items[i].metadata.annotations['vsm.openebs.io/replica-count'],
                        kind: data.items[i].kind,
                        castype: data.items[i].spec.casType
                    });
                }
            }
        }
        // console.log(body +' this is body1')
        console.log(mayaVolume);

        res.status(200).json(mayaVolume);
    });

});
module.exports = router;