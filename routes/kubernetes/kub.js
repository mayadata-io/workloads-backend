const k8s = require('@kubernetes/client-node');
const express = require('express');
const router = express();

const k8sApi = k8s.Config.defaultClient();

router.get('/status', (req, resp) => {
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
          // kind: res.body.items[i].metadata.ownerReferences[0].kind
        });
      }
      resolve(allStatus);
    }).then(allStatus => {
      resp.status(200).json(allStatus);
    });
  });
});

router.get('/applications', (request, response) => {
  k8sApi.listNamespace().then(res => {
    var listOfNamespaces = {
      jiva: [],
      cstor: []
    };
    return new Promise(function (resolve, reject) {
      for (i = 0; i < res.body.items.length; i++) {
        let workloadName = res.body.items[i].metadata.name.split('-')[0];
        if (res.body.items[i].metadata.name.includes('cstor') || res.body.items[i].metadata.name.includes('logging')) {
          listOfNamespaces.cstor.push({
            workloadName: workloadName,
            engine: 'cStor',
            namespace:res.body.items[i].metadata.name
          })
        } else if (res.body.items[i].metadata.name.includes('jiva') || res.body.items[i].metadata.name.includes('wordpress')) {
          listOfNamespaces.jiva.push({
            workloadName: workloadName,
            engine: 'Jiva',
            namespace:res.body.items[i].metadata.name
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


setInterval( () =>{
  if( process.env.APP_NAME == undefined ){
    console.error( "provide app name");
  }else{
    listOfApp =  process.env.APP_NAME.split(" ");
    apiUrl = process.env.API_URL
    requests = listOfApp.map(name => {
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
        appName: String,
        podStatus: [],
        StatefulSet: {},
        Deployment:{}
      };
      return k8sApi.listNamespacedPod(`${name}`).then(res => {
        return new Promise(function (resolve, reject) {
         let groupCount = 0 ;
          for (i = 0; i < res.body.items.length; i++) {

            allStatus.namespace = `${name}`;
            
            allStatus.apiurl = apiUrl
            if(typeof res.body.items[i].metadata.labels.workload_openebs_name != 'undefined'){
              
           if(allStatus.name != " "){
              allStatus.name = res.body.items[i].metadata.labels.workload_openebs_name
           }
              if(res.body.items[i].metadata.ownerReferences[0].kind == 'StatefulSet' && res.body.items[i].metadata.ownerReferences[0].kind !== 'undefined'){
              allStatus.StatefulSet[res.body.items[i].metadata.ownerReferences[0].name]	= allStatus.StatefulSet[res.body.items[i].metadata.ownerReferences[0].name] ||0;
              allStatus.StatefulSet[res.body.items[i].metadata.ownerReferences[0].name]++;        
            }else{
              allStatus.Deployment[res.body.items[i].metadata.ownerReferences[0].name]	= allStatus.Deployment[res.body.items[i].metadata.ownerReferences[0].name] ||0;
              allStatus.Deployment[res.body.items[i].metadata.ownerReferences[0].name]++;
            }}

            if(status[res.body.items[i].status.phase] >= overAllStatusCount) {
              overAllStatusCount = res.body.items[i].status.phase;
              allStatus.status = res.body.items[i].status.phase;          
            }
            
            allStatus.podStatus.push({
              name: res.body.items[i].metadata.name,
              status: res.body.items[i].status.phase,
            });
            
          }
          allStatus.groupCount=(Object.keys(allStatus.Deployment).length + Object.keys(allStatus.StatefulSet).length);
          if(Object.keys(allStatus.Deployment).length + Object.keys(allStatus.StatefulSet).length>1){
            allStatus.group= 'Grouped'
          }else{
            allStatus.group= 'Standalone'
          }
          allStatus.numberOfDeployment=Object.keys(allStatus.Deployment).length
          allStatus.numberOfStatefulset = Object.keys(allStatus.StatefulSet).length
          resolve(allStatus);
      })
      })
    });
}

},5000)

router.get('/statuses', (request,resp)=>{
  Promise.all(requests)
  .then(responses => {  
    // console.log(JSON.stringify(responses));
    resp.status(200).json(responses);
  })
});

module.exports = router;
