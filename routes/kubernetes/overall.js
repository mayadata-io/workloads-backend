const k8s = require("@kubernetes/client-node");
const express = require("express");
const router = express();
//this is for outside the cluster
// let kc = new k8s.KubeConfig();
// kc.loadFromCluster();
// let k8sApi = new k8s.Core_v1Api(kc.getCurrentCluster()["server"]);
// k8sApi.setDefaultAuthentication(kc);

// this is for inseide the cluster
// var k8sApi = k8s.Config.defaultClient();

//list of namespaces
// router.get("/application", (request, response) => {
//     k8sApi.listNamespace().then(res => {
//         var listOfNamespaces = {
//             jiva: [],
//             cstor: [],
//             allNamespaces: []
//         };
//         return new Promise(function (resolve, reject) {
//             for (i = 0; i < res.body.items.length; i++) {
//                 var workloadName = res.body.items[i].metadata.name.split("-")[0];
//                 var openebsStorgaeEngine = res.body.items[i].metadata.name.split("-")[1];
//                 if (res.body.items[i].metadata.name.includes("cstor")) {
//                     listOfNamespaces.cstor.push({
//                         workloadName: workloadName,
//                         engine: openebsStorgaeEngine,
//                         namespaces: res.body.items[i].metadata.name
//                     });
//                     listOfNamespaces.allNamespaces.push({ namespaces: res.body.items[i].metadata.name });
//                 } else if (res.body.items[i].metadata.name.includes("jiva")) {
//                     listOfNamespaces.jiva.push({
//                         workloadName: workloadName,
//                         engine: openebsStorgaeEngine,
//                         namespaces: res.body.items[i].metadata.name
//                     });
//                     listOfNamespaces.allNamespaces.push({ namespaces: res.body.items[i].metadata.name })
//                 }
//             }
//             resolve(listOfNamespaces);
//         }
//         ).then(listOfNamespaces => {
//             console.log(listOfNamespaces);
//             // response.status(200).json(listOfNamespaces);
//             overallstatus = {
//                 cstorVolumes: [],
//                 jivaVolumes: []
//             }

//             return new Promise(function (resolve, reject) {
//                 for (i = 0; i < listOfNamespaces.allNamespaces.length; i++) {
//                     k8sApi.listNamespacedPod(nameSpaces).then(res => {
//                         console.log(JSON.stringify(res.body));
//                         console.log("=========================================================================================================")
//                     })
//                 }
//                 response.status(200).json(listOfNamespaces);
//             })
//         });
//     });
// });



module.exports = router;
