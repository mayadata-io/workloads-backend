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


router.get('/sequence', (request, response) => {
    k8sApi.listNamespacedPersistentVolumeClaim('mongo-jiva').then((resp => {
        var overAllStatusCount = 0;
        var status = {
            Running: 0,
            Pending: 1,
            Failed: 2,
            Unknown: 3
        }
        var podDetails = {
            status: String,
            statefulSet: [],
            applicationPod: [],
            jivaController: [],
            jivaReplica: []
        }
        var pvcDetails = [];
        return new Promise(function (resolve, reject) {

            for (i = 0; i < resp.body.items.length; i++) {
                pvcDetails.push(
                    {
                        name: resp.body.items[i].metadata.name,
                        volumeName: resp.body.items[i].spec.volumeName
                    }
                )
            }
            resolve(pvcDetails);
        }).then((pvcDetails) => {
            k8sApi.listNamespacedPod('mongo-jiva')
                .then((res) => {
                    return new Promise(function (resolve, reject) {
                        for (i = 0; i < res.body.items.length; i++) {
                            if (status[res.body.items[i].status.phase] >= overAllStatusCount) {
                                overAllStatusCount = res.body.items[i].status.phase;
                                podDetails.status = res.body.items[i].status.phase
                            }
                            if (res.body.items[i].metadata.ownerReferences[0].kind == 'StatefulSet') {
                                podDetails.statefulSet.push({
                                    kind: res.body.items[i].metadata.ownerReferences[0].kind,
                                    name: res.body.items[i].metadata.name,
                                    namespace: res.body.items[i].metadata.namespace,
                                    volumes: res.body.items[i].spec.volumes[0].name,
                                    pvc: res.body.items[i].spec.volumes[0].persistentVolumeClaim.claimName,
                                    status: res.body.items[i].status.phase,
                                    nodeName: res.body.items[i].spec.nodeName,
                                    adjacency: pvcDetails.find(function (obj) { return obj.name === res.body.items[i].spec.volumes[0].persistentVolumeClaim.claimName; }).volumeName + '-ctrl-'
                                });

                            } else if (res.body.items[i].metadata.ownerReferences[0].kind == 'ReplicaSet') {
                                if (res.body.items[i].metadata.name.includes('-rep-') && res.body.items[i].metadata.name.includes('pvc-')) {
                                    console.log('name : ' + res.body.items[i].spec.containers[0].image);
                                    podDetails.jivaReplica.push({
                                        kind: res.body.items[i].metadata.ownerReferences[0].kind,
                                        name: res.body.items[i].metadata.name,
                                        namespace: res.body.items[i].metadata.namespace,
                                        pvc: res.body.items[i].metadata.labels.pvc,
                                        vsm: res.body.items[i].metadata.labels.vsm,
                                        nodeName: res.body.items[i].spec.nodeName,
                                        status: res.body.items[i].status.phase,
                                        openebsjivaversion: res.body.items[i].spec.containers[0].image
                                    });
                                } else if (res.body.items[i].metadata.name.includes('-ctrl-') && res.body.items[i].metadata.name.includes('pvc-')) {

                                    podDetails.jivaController.push({
                                        kind: res.body.items[i].metadata.ownerReferences[0].kind,
                                        name: res.body.items[i].metadata.name,
                                        namespace: res.body.items[i].metadata.namespace,
                                        pvc: res.body.items[i].metadata.labels.pvc,
                                        vsm: res.body.items[i].metadata.labels.vsm,
                                        nodeName: res.body.items[i].spec.nodeName,
                                        status: res.body.items[i].status.phase,
                                        openebsjivaversion: res.body.items[i].spec.containers[0].image,
                                        adjacency: pvcDetails.find(function (obj) { return obj.name === res.body.items[i].metadata.labels.pvc; }).volumeName + '-rep-'
                                    });
                                } else {
                                    podDetails.applicationPod.push({
                                        kind: res.body.items[i].metadata.ownerReferences[0].kind,
                                        name: res.body.items[i].metadata.name,
                                        namespace: res.body.items[i].metadata.namespace,
                                        nodeName: res.body.items[i].spec.nodeName,
                                        status: res.body.items[i].status.phase,
                                        dockerImage: res.body.items[i].spec.containers[0].image
                                    });
                                }
                            }
                        }
                        resolve(podDetails);
                    }).then((podDetails) => {
                        response.status(200).json(podDetails);
                    })

                });
        })
    }))
});

module.exports = router;