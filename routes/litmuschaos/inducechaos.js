const express = require("express");
const router = express();
const killTarget = require("./killtarget");
const killReplica = require("./killreplica");
const networkDelay = require("./targetnetworkdelay");
const k8s = require("@kubernetes/client-node");

const Client = require("kubernetes-client").Client;
const config = require("kubernetes-client").config;

//Entrypoint main
function initJob(app) {
  createJob(app, config, Client);
}

async function createJob(deploymentManifest, config, Client) {
  try {
    const client = new Client({ config: config.getInCluster() });
    await client.loadSpec();
    // const client = new Client({
    //   config: config.fromKubeconfig(),
    //   version: "1.9"
    // });

    const create = await client.apis.batch.v1
      .namespaces("litmus")
      .jobs.post({ body: deploymentManifest });
    console.log("Result: ", create);
  } catch (err) {
    console.error("Error: ", err);
  }
}

router.get("/", (req, res) => {
  // var app = req.query.app;

  var type = req.query.type;
  var appnamespace = req.query.appnamespace;
  var targetnamespace = req.query.targetnamespace;
  var appname = req.query.app;
  var volumename = req.query.volumename;
  console.log(req.query);
  console.log(type);
  console.log(JSON.stringify(req.query));

  if (appnamespace.includes("cstor")) {
    if (type == "0") {
      r = initJob(
        killReplica(appname, appnamespace, targetnamespace, volumename)
      );
    } else if (type == "1") {
      r = initJob(
        networkDelay(appname, appnamespace, targetnamespace, volumename)
      );
    }
  } else {
    if (type == "0") {
      r = initJob(
        killTarget(appname, appnamespace, targetnamespace, volumename)
      );
    } else if (type == "1") {
      r = initJob(
        killReplica(appname, appnamespace, targetnamespace, volumename)
      );
    } else if (type == "2") {
      r = initJob(
        networkDelay(appname, appnamespace, targetnamespace, volumename)
      );
    }
  }
  res.status(200).json();
});

let kc = new k8s.KubeConfig();
kc.loadFromCluster();
let k8sApi = new k8s.Core_v1Api(kc.getCurrentCluster()["server"]);
k8sApi.setDefaultAuthentication(kc);

// this is for inseide the cluster
// var k8sApi = k8s.Config.defaultClient();

router.get("/litmusstatus", (req, resp) => {
  var allStatus = {
    runnigPos: [],
    completes: []
  };

  k8sApi.listNamespacedPod("litmus").then(res => {
    return new Promise(function(resolve, reject) {
      for (i = 0; i < res.body.items.length; i++) {
        if (
          res.body.items[i].status.phase == "Running" &&
          res.body.items[i].metadata.name.includes(req.query.appnamespace)

        ) {
          allStatus.runnigPos.push({
            name: res.body.items[i].metadata.name,
            status: res.body.items[i].status.phase
          });
        } else if (
          res.body.items[i].status.phase === "Succeeded" &&
          res.body.items[i].metadata.name.includes(req.query.appnamespace)
        ) {
          allStatus.completes.push({
            name: res.body.items[i].metadata.name,
            status: res.body.items[i].status.phase
          });
        }
      }
      resolve(allStatus);
    }).then(allStatus => {
      resp.status(200).json(allStatus);
    });
  });
});
module.exports = router;
