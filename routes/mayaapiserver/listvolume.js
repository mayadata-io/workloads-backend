const express = require("express");
const router = express();
const http = require("request");

router.get("/volume", (req, res) => {
  var mayaVolume = [];
  var options = {
    url: `http://maya-apiserver-service.openebs:5656/latest/volumes/`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      namespace: req.query.workloadname + "-" + req.query.openebsengine
    }
  };


  console.log(options);
  console.log("=======================================================================================================")
  http.get(options, function(err, resp, body) {
    if (err) {
      console.log("this is volume erro namespaces ");
    } else {
      data = JSON.parse(body);
     console.log(JSON.stringify(data));
      for (i = 0; i < data.items.length; i++) {
        if (
          data.items[i].metadata.namespace.includes(req.query.workloadname) &&
          data.items[i].metadata.namespace.includes(req.query.openebsengine)
        ) {
          if (req.query.openebsengine.includes("cstor")) {
            mayaVolume.push({
              name: data.items[i].metadata.name,
              size:
                data.items[i].metadata.annotations["openebs.io/volume-size"],
              status:
                data.items[i].metadata.annotations[
                  "openebs.io/controller-status"
                ],
              replicas: data.items[i].spec.replicas,
              kind: data.items[i].kind,
              castype: data.items[i].spec.casType
            });
          } else {
            mayaVolume.push({
              name: data.items[i].metadata.name,
              size:
                data.items[i].metadata.annotations["openebs.io/volume-size"],
              status:
                data.items[i].metadata.annotations[
                  "openebs.io/controller-status"
                ],
              replicas:
                data.items[i].metadata.annotations[
                  "vsm.openebs.io/replica-count"
                ],
              kind: data.items[i].kind,
              castype: data.items[i].spec.casType
            });
          }
        }
      }
    }

    res.status(200).json(mayaVolume);
  });
});
module.exports = router;
