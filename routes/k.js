const k8s = require('@kubernetes/client-node');

let kc = new k8s.KubeConfig();
kc.loadFromCluster();

let k8sApi = new k8s.Core_v1Api(kc.getCurrentCluster()['server']);
k8sApi.setDefaultAuthentication(kc);

// k8sApi.listNamespacedPod('mon')
//     .then((res) => {
//         console.log(res.body);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// var k8sApi = k8s.Config.defaultClient();
k8sApi.listNamespacedPod('mongo-jiva')
    .then((res) => {
        console.log(res.body.items);
    });