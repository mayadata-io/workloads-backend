const k8s = require('@kubernetes/client-node');

var k8sApi = k8s.Config.defaultClient();
k8sApi.listNamespacedPod('default')
    .then((res) => {
        console.log(res.body);
        console.log("this kubernettes");
    });