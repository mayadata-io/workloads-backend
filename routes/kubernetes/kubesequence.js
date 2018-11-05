const k8s = require("@kubernetes/client-node");
const express = require("express");
const router = express();

const k8sApi = k8s.Config.defaultClient();

router.get("/sequence", (request, response) => {
  nameSpaces = request.query.appnamespace;
  volumeNameSpaces = request.query.volumenamespace
  if(nameSpaces.includes("jiva") || nameSpaces.includes("nfs")){
  k8sApi.listNode().then(resNode => {
    return new Promise(function(resolve, reject) {
      var listNode = [];
      for (i = 0; i < resNode.body.items.length; i++) {
        listNode[resNode.body.items[i].metadata.name] = "Node-" + (i + 1);
      }
      resolve(listNode);
    }).then(listNode => {
      k8sApi.listNamespacedPersistentVolumeClaim(nameSpaces).then(resp => {
        var pvcNodeDetails = {
          pvc: [],
          numberOfPvc: resp.body.items.length,
          nodes: listNode
        };
        return new Promise(function(resolve, reject) {
          for (i = 0; i < resp.body.items.length; i++) {
            pvcNodeDetails.pvc.push({
              name: resp.body.items[i].metadata.name,
              volumeName: resp.body.items[i].spec.volumeName
            });
          }
          resolve(pvcNodeDetails);
        }).then(pvcNodeDetails => {
          k8sApi.listNamespacedPod(nameSpaces).then(res => {
            var overAllStatusCount = 0;
            var status = {
              Running: 0,
              Pending: 1,
              Failed: 2,
              Unknown: 3
            };
            var podDetails = {
              status: String,
              statefulSet: [],
              applicationPod: [],
              jivaController: [],
              jivaReplica: [],
              pvc: pvcNodeDetails
            };
            return new Promise(function(resolve, reject) {
              for (i = 0; i < res.body.items.length; i++) {
                if (
                  status[res.body.items[i].status.phase] >= overAllStatusCount
                ) {
                  overAllStatusCount = res.body.items[i].status.phase;
                  podDetails.status = res.body.items[i].status.phase;
                }
                if (
                  res.body.items[i].metadata.labels.type ==
                  "workload"
                ) {
                  var dimage ;
                  if ( res.body.items[i].metadata.name.includes("redis")
                  ){                  
                    dimage=(res.body.items[i].spec.initContainers[0].image)
                  }else{
                    dimage=(res.body.items[i].spec.containers[0].image)
                  }
                  
                  podDetails.statefulSet.push({
                    kind: res.body.items[i].metadata.ownerReferences[0].kind,
                    name: res.body.items[i].metadata.name,
                    namespace: res.body.items[i].metadata.namespace,
                    volumes: res.body.items[i].spec.volumes[0].name,
                    pvc:
                      res.body.items[i].spec.volumes[0].persistentVolumeClaim
                        .claimName,
                    status: res.body.items[i].status.phase,
                    nodeName: res.body.items[i].spec.nodeName,
                    dockerImage: dimage,
                    node: pvcNodeDetails.nodes[res.body.items[i].spec.nodeName],
                    applabel: res.body.items[i].metadata.labels.app
                  });
                  
                } else if (
                    res.body.items[i].metadata.name.includes("rep") 
                  ) {
                    podDetails.jivaReplica.push({
                      kind: res.body.items[i].metadata.ownerReferences[0].kind,
                      name: res.body.items[i].metadata.name,
                      namespace: res.body.items[i].metadata.namespace,
                      pvc: res.body.items[i].metadata.labels['openebs.io/persistent-volume-claim'],
                      vsm: res.body.items[i].metadata.labels.vsm,
                      nodeName: res.body.items[i].spec.nodeName,
                      node:
                        pvcNodeDetails.nodes[res.body.items[i].spec.nodeName],
                      status: res.body.items[i].status.phase,
                      openebsjivaversion:
                        res.body.items[i].spec.containers[0].image
                    });
                  } else if (
                    res.body.items[i].metadata.name.includes("ctr")
                  ) {
                    podDetails.jivaController.push({
                      kind: res.body.items[i].metadata.ownerReferences[0].kind,
                      name: res.body.items[i].metadata.name,
                      namespace: res.body.items[i].metadata.namespace,
                      pvc: res.body.items[i].metadata.labels['openebs.io/persistent-volume-claim'],
                      vsm: res.body.items[i].metadata.labels.vsm,
                      nodeName: res.body.items[i].spec.nodeName,
                      node:
                        pvcNodeDetails.nodes[res.body.items[i].spec.nodeName],
                      status: res.body.items[i].status.phase,
                      openebsjivaversion:
                        res.body.items[i].spec.containers[0].image,
                    });
                  }                
              }
              resolve(podDetails);
            }).then(podDetails => {
              response.status(200).json(podDetails);
            });
          });
        });
      });
    });
  });}
  else if(nameSpaces.includes("cstor")){
    k8sApi.listNode().then(resNode => {
      return new Promise(function (resolve, reject) {
        var listNode = [];
        for (i = 0; i < resNode.body.items.length; i++) {
          listNode[resNode.body.items[i].metadata.name] = "Node-" + (i + 1);
        }
        resolve(listNode);
      }).then(listNode => {
        k8sApi.listNamespacedPersistentVolumeClaim(nameSpaces).then(resp => {
          var pvcNodeDetails = {
            pvc: [],
            numberOfPvc: resp.body.items.length,
            nodes: listNode
          };
          return new Promise(function (resolve, reject) {
            for (i = 0; i < resp.body.items.length; i++) {
              pvcNodeDetails.pvc.push({
                name: resp.body.items[i].metadata.name,
                volumeName: resp.body.items[i].spec.volumeName
              });
            }
            resolve(pvcNodeDetails);
          }).then(pvcNodeDetails => {
            k8sApi.listNamespacedPod(nameSpaces).then(res => {
              var overAllStatusCount = 0;
              var status = {
                Running: 0,
                Pending: 1,
                Failed: 2,
                Unknown: 3
              };
              var podDetails = {
                status: String,
                statefulSet: [],
                applicationPod: [],
                jivaController: [],
                jivaReplica: [],
                pvc: pvcNodeDetails
              };
              return new Promise(function (resolve, reject) {
                for (i = 0; i < res.body.items.length; i++) {
                  if (
                    status[res.body.items[i].status.phase] >= overAllStatusCount
                  ) {
                    overAllStatusCount = res.body.items[i].status.phase;
                    podDetails.status = res.body.items[i].status.phase;
                  }
                  if (
                    res.body.items[i].metadata.labels.type ==
                    "workload"
                  ) {
                 
                    podDetails.statefulSet.push({
                      kind: res.body.items[i].metadata.ownerReferences[0].kind,
                      name: res.body.items[i].metadata.name,
                      namespace: res.body.items[i].metadata.namespace,
                      volumes: res.body.items[i].spec.volumes[0].name,
                      pvc:
                        res.body.items[i].spec.volumes[0].persistentVolumeClaim
                          .claimName,
                      status: res.body.items[i].status.phase,
                      nodeName: res.body.items[i].spec.nodeName,
                      dockerImage: res.body.items[i].spec.containers[0].image,
                      node: pvcNodeDetails.nodes[res.body.items[i].spec.nodeName],
                      applabel: res.body.items[i].metadata.labels.app
                    });
                  }
                }
  
                resolve(podDetails);
              }).then(podDetails => {
                k8sApi.listNamespacedPod('openebs').then(re => {
                  return new Promise(function (resolve, reject) {
                    for (i = 0; i < re.body.items.length; i++) {
                      if (
                        re.body.items[i].metadata.name.includes(nameSpaces)
                      ) {
                        podDetails.jivaController.push({
                          kind: re.body.items[i].metadata.ownerReferences[0].kind,
                          name: re.body.items[i].metadata.name,
                          namespace: re.body.items[i].metadata.namespace,
                          pvc: re.body.items[i].metadata.labels['openebs.io/persistent-volume-claim'],
                          nodeName: re.body.items[i].spec.nodeName,
                          node:
                            pvcNodeDetails.nodes[re.body.items[i].spec.nodeName],
                          status: re.body.items[i].status.phase,
                          openebsjivaversion:
                            re.body.items[i].spec.containers[0].image                            
                        });
                      }
                    }
  
                    resolve(podDetails);
                  }).then(podDetails => {
                    response.status(200).json(podDetails);
                  });
                });
              });
            });
          });
        });
      });
    });
  }
});

module.exports = router;
