// const k8s = require('@kubernetes/client-node');
// const express = require('express');
// const randomString = require('randomstring');
// const router = express();


// router.get('', (req, res) => {
//     var k8sApi = k8s.Config.defaultClient();
//     var namespace = {
//         metadata: {
//           name: 'test'
//         }
//       };
      
//       k8sApi.createNamespace(namespace).then(
//         (response) => {
//           console.log('Created namespace');
//           console.log(response);
//           k8sApi.readNamespace(namespace.metadata.name).then(
//             (response) => {
//               console.log(response);
//               k8sApi.deleteNamespace(
//                 namespace.metadata.name, {} /* delete options */);
//             });
//         },
//         (err) => {
//           console.log('Error!: ' + err);
//         }
//       );
//       console.log('this is name space')
// });



// console.log('this is kube ');

// module.exports = router;
