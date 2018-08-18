const k8s = require('@kubernetes/client-node');
const express = require('express');
const router = express();
//this is for outside the cluster
let kc = new k8s.KubeConfig();
kc.loadFromCluster();
let k8sApi = new k8s.Core_v1Api(kc.getCurrentCluster()['server']);
k8sApi.setDefaultAuthentication(kc);

// this is for inseide the cluster
// var k8sApi = k8s.Config.defaultClient();



router.get('/status', (req, resp) => {

    var overAllStatus = "";
    var overAllStatusCount = 0;
    var status = {
        Running: 0,
        Pending: 1,
        Failed: 2,
        Unknown: 3
    }
    var allStatus = {
        status: String,
        podStatus: []
    }

    k8sApi.listNamespacedPod('mongo-jiva')
        .then((res) => {
            return new Promise(function (resolve, reject) {
                for (i = 0; i < res.body.items.length; i++) {
                    if (status[res.body.items[i].status.phase] >= overAllStatusCount) {
                        overAllStatusCount = res.body.items[i].status.phase;
                        allStatus.status = res.body.items[i].status.phase
                    }
                    allStatus.podStatus.push({
                        name: res.body.items[i].metadata.name,
                        status: res.body.items[i].status.phase,
                        kind: res.body.items[i].metadata.ownerReferences[0].kind
                    });

                }
                resolve(allStatus);
            }).then((allStatus) => {
                resp.status(200).json(allStatus);
            })

        });
});

module.exports = router;