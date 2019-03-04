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

// var overallstatus = {
//   cstorVolumes: [],
//   jivaVolumes: []
// };

// //list of namespaces
// router.get("/application", (request, response) => {
//   response.status(200).json(overallstatus);
// });


// setInterval(function(){
// k8sApi.listNamespace().then(res => {
//   var listOfNamespaces = {
//     jiva: [],
//     cstor: [],
//     allNamespaces: []
//   };
//   return new Promise(function (resolve, reject) {
//     for (i = 0; i < res.body.items.length; i++) {
//       var workloadName = res.body.items[i].metadata.name.split("-")[0];
//       var openebsStorgaeEngine = res.body.items[i].metadata.name.split("-")[1];
//       if (res.body.items[i].metadata.name.includes("cstor")) {
//         listOfNamespaces.cstor.push({
//           workloadName: workloadName,
//           engine: openebsStorgaeEngine,
//           namespaces: res.body.items[i].metadata.name
//         });
//         listOfNamespaces.allNamespaces.push(res.body.items[i].metadata.name);
//       } else if (res.body.items[i].metadata.name.includes("jiva")) {
//         listOfNamespaces.jiva.push({
//           workloadName: workloadName,
//           engine: openebsStorgaeEngine,
//           namespaces: res.body.items[i].metadata.name
//         });
//         listOfNamespaces.allNamespaces.push(res.body.items[i].metadata.name)
//       }
//     }
//     resolve(listOfNamespaces);
//     console.log(listOfNamespaces);
//   }
//   ).then(listOfNamespaces => {
//     // console.log(listOfNamespaces);
//     // response.status(200).json(listOfNamespaces);


//     return new Promise(function (resolve, reject) {
//       overallstatus = {
//         cstorVolumes: [],
//         jivaVolumes: []
//       };
//       for (i = 0; i < listOfNamespaces.allNamespaces.length; i++) {
//         // console.log(listOfNamespaces.allNamespaces[i]);
//         k8sApi.listNamespacedPod(listOfNamespaces.allNamespaces[i]).then(res => {

//           if (res.body.items[0].metadata.namespace.includes("cstor") && !res.body.items[0].metadata.namespace.includes("prometheus")) {
//             var overAllStatusCount = 0;
//             var statefulsetDeployment = 0;
//             var briefstatus = "";
//             var status = {
//               Running: 0,
//               Pending: 1,
//               Failed: 2,
//               Unknown: 3
//             };
//             pod = []
//             for (j = 0; j < res.body.items.length; j++) {
//               if (status[res.body.items[j].status.phase] >= overAllStatusCount) {
//                 overAllStatusCount = res.body.items[j].status.phase;
//                 briefstatus = res.body.items[j].status.phase;
//                 name = res.body.items[j].metadata.name;
//               }
//               if (!res.body.items[j].metadata.name.includes(res.body.items[0].metadata.namespace)) {
//                 statefulsetDeployment++;
//               }
//               pod.push({
//                 name: res.body.items[j].metadata.name,
//                 status: res.body.items[j].status.phase
//               });

//             }

//             overallstatus.cstorVolumes.push({
//               status: briefstatus,
//               kind: statefulsetDeployment,
//               pods: pod
//             });
//           } else if (res.body.items[0].metadata.namespace.includes("jiva") && !res.body.items[0].metadata.namespace.includes("prometheus")) {

//             var overAllStatusCount = 0;
//             var statefulsetDeployment = 0;
//             var briefstatus = "";
//             var status = {
//               Running: 0,
//               Pending: 1,
//               Failed: 2,
//               Unknown: 3
//             };
//             pod = []
//             for (j = 0; j < res.body.items.length; j++) {
//               if (status[res.body.items[j].status.phase] >= overAllStatusCount) {
//                 overAllStatusCount = res.body.items[j].status.phase;
//                 briefstatus = res.body.items[j].status.phase;
//                 name = res.body.items[j].metadata.name;
//               }
//               if (!res.body.items[j].metadata.name.includes(res.body.items[0].metadata.namespace)) {
//                 statefulsetDeployment++;
//               }
//               pod.push({
//                 name: res.body.items[j].metadata.name,
//                 status: res.body.items[j].status.phase
//               });

//             }

//             overallstatus.jivaVolumes.push({
//               status: briefstatus,
//               kind: statefulsetDeployment,
//               pods: pod
//             });

//           }
//           // console.log(JSON.stringify(overallstatus));
//           console.log("=========================================================================================================")
//         })
//       }
//       resolve(overallstatus)
//       console.log(overallstatus);
//       // response.status(200).json(overallstatus);
//     }).then(status => {
//       console.log(JSON.stringify(status) + "tfyt");
//       // response.status(200).json("ytf");

//     })
//   });
// });},1000);

// promise all example

// request = namespaces.map(name => {
//   console.log(name);
//   return k8sApi.listNamespacedPod(`${name}`).then(res =>  res);
// });

// Promise.all(request)
// .then(responses => {  
//   console.log(JSON.stringify(responses));
// })

module.exports = router;
