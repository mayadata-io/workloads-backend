const k8s = require('@kubernetes/client-node');
const express = require('express');

const router = express();
// this is for outside the cluster
// let kc = new k8s.KubeConfig();
// kc.loadFromCluster();
// let k8sApi = new k8s.Core_v1Api(kc.getCurrentCluster()["server"]);
// k8sApi.setDefaultAuthentication(kc);

// this is for inseide the cluster
const k8sApi = k8s.Config.defaultClient();

// for (let i = 0, p = Promise.resolve(); i < 10; i++) {
//   p = p.then(_ => new Promise(resolve =>
//       setTimeout(function () {
//           console.log(i);
//           resolve();
//       }, Math.random() * 1000)
//   ));
// }

router.get('/status', (req, resp) => {
    const overAllStatus = '';
    let overAllStatusCount = 0;
    const status = {
        Running: 0,
        Pending: 1,
        Failed: 2,
        Unknown: 3,
    };
    const allStatus = {
        status: String,
        podStatus: [],
    };

    k8sApi.listNamespacedPod(req.query.namespace).then(res => new Promise(((resolve, reject) => {
        for (i = 0; i < res.body.items.length; i++) {
            if (status[res.body.items[i].status.phase] >= overAllStatusCount) {
                overAllStatusCount = res.body.items[i].status.phase;
                allStatus.status = res.body.items[i].status.phase;
            }
            allStatus.podStatus.push({
                name: res.body.items[i].metadata.name,
                status: res.body.items[i].status.phase,
                kind: res.body.items[i].metadata.ownerReferences[0].kind,
            });
        }
        resolve(allStatus);
    })).then((allStatus) => {
        resp.status(200).json(allStatus);
    }));
});


router.get('/applications', (request, response) => {
    k8sApi.listNamespace().then((res) => {
        const listOfNamespaces = {
            jiva: [],
            cstor: [],
        };
        return new Promise(((resolve, reject) => {
            for (i = 0; i < res.body.items.length; i++) {
                const workloadName = res.body.items[i].metadata.name.split('-')[0];
                const openebsStorgaeEngine = res.body.items[i].metadata.name.split('-')[1];
                if (res.body.items[i].metadata.name.includes('cstor')) {
                    listOfNamespaces.cstor.push({
                        workloadName,
                        engine: openebsStorgaeEngine,
                    });
                } else if (res.body.items[i].metadata.name.includes('jiva')) {
                    listOfNamespaces.jiva.push({
                        workloadName,
                        engine: openebsStorgaeEngine,
                    });
                }
            }
            resolve(listOfNamespaces);
        })).then((listOfNamespaces) => {
            // console.log(listOfNamespaces);
            response.status(200).json(listOfNamespaces);
        });
    });
});

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


module.exports = router;
