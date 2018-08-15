const k8s = require('@kubernetes/client-node');

var k8sApi = k8s.Config.defaultClient();
k8sApi.listNamespacedPod('mongo-jiva')
   .then((res) => {
       console.log(res.body.items);
   });