const k8s = require("@kubernetes/client-node");
const express = require("express");
const router = express();

const k8sApi = k8s.Config.defaultClient();

router.get("/status", (req, resp) => {
  var overAllStatus = "";
  var overAllStatusCount = 0;
  var status = {
    Running: 0,
    Pending: 1,
    Failed: 2,
    Unknown: 3
  };
  var allStatus = {
    status: String,
    podStatus: []
  };

  k8sApi.listNamespacedPod(req.query.namespace).then(res => {
    return new Promise(function (resolve, reject) {
      for (i = 0; i < res.body.items.length; i++) {
        if (status[res.body.items[i].status.phase] >= overAllStatusCount) {
          overAllStatusCount = res.body.items[i].status.phase;
          allStatus.status = res.body.items[i].status.phase;
        }
        allStatus.podStatus.push({
          name: res.body.items[i].metadata.name,
          status: res.body.items[i].status.phase,
          kind: res.body.items[i].metadata.ownerReferences[0].kind
        });
      }
      resolve(allStatus);
    }).then(allStatus => {
      resp.status(200).json(allStatus);
    });
  });
});

router.get("/applications", (request, response) => {
  k8sApi.listNamespace().then(res => {
    var listOfNamespaces = {
      jiva: [],
      cstor: []
    };
    return new Promise(function (resolve, reject) {
      for (i = 0; i < res.body.items.length; i++) {
        var workloadName = res.body.items[i].metadata.name.split("-")[0];
        var openebsStorgaeEngine = res.body.items[i].metadata.name.split("-")[1];
        if (res.body.items[i].metadata.name.includes("cstor")) {
          listOfNamespaces.cstor.push({
            workloadName: workloadName,
            engine: openebsStorgaeEngine
          })
        } else if (res.body.items[i].metadata.name.includes("jiva")) {
          listOfNamespaces.jiva.push({
            workloadName: workloadName,
            engine: openebsStorgaeEngine
          })
        }
      }
      resolve(listOfNamespaces);
    }
    ).then(listOfNamespaces => {
      response.status(200).json(listOfNamespaces);
    });
  });
});

module.exports = router;
