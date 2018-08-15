const k8s = require('@kubernetes/client-node');
const express = require('express');
const randomString = require('randomstring');
const router = express();


router.get('/', (req, res) => {

    var k8sApi = k8s.Config.defaultClient();
    k8sApi.listNamespacedPod('default')
        .then((res) => {
            console.log(res.body);
            console.log("this kubernettes");
        });
});

console.log('this is kube ');

module.exports = router;
