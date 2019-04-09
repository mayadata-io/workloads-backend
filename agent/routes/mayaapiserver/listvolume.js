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

  numberOfPVC = JSON.parse(req.query.pvcDetails).length;
  for(i=0; i<numberOfPVC;i++){
    
    console.log(JSON.parse(req.query.pvcDetails)[i].volumeName);
  }
  console.log(options);
  console.log("=======================================================================================================")
  http.get(options, function(err, resp, body) {
    if (err) {
      console.log("this is volume error namespaces");
    } else { 
      data = JSON.parse(body);
      x = JSON.parse(req.query.pvcDetails)
    //  console.log(JSON.stringify(data));
      for (let j=0; j<numberOfPVC; j++ ){
        // console.log(x + "x");
        // console.log(JSON.parse(x[i]).volumeName +" volume name");
        // console.log(JSON.parse(x[i]).name + "pvc name");
        console.log(JSON.parse(req.query.pvcDetails)[j].name + "bhhh");
        console.log(JSON.parse(req.query.pvcDetails)[j].volumeName + "bhhh");
        console.log("====================================================")

       for (i = 0; i < data.items.length; i++) {
        // console.log(i +" "+ x[j].volumeName +" "+ data.items[i].metadata.name + "gfcgfcgfcj")
            if(JSON.parse(req.query.pvcDetails)[j].volumeName == data.items[i].metadata.name){
              // console.log(i +" "+ x[j].volumeName +" "+ data.items[i].metadata.name)
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
      }}}}

    res.status(200).json(mayaVolume);
  });
});
module.exports = router;
