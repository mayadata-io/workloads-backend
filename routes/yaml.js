
const express = require('express');
const router = express();

router.get('/yaml', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "mongo",
        applicationType:"Statefulset",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-mongo.yaml"
 });
});



router.get('/yaml/mongo-jiva', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "mongo",
        applicationType:"Statefulset",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/master/production/mongo-jiva/mongo-jiva-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/master/production/mongo-jiva/mongo-jiva-mongo.yaml"
 });
});



router.get('/yaml/percona-jiva', (req, res) => {
    res.status(200).json({
        status: 200,
        workloadName: "percona",
        applicationType:"Deployment",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/master/production/mongo-jiva/mongo-jiva-namespace.yaml",
        workloadyaml: "https://github.com/openebs/e2e-infrastructure/blob/master/production/mongo-jiva/mongo-jiva-mongo.yaml"
    });
});

router.get('/yaml/cockroach-jiva', (req, res) => {
    res.status(200).json({
        status: 200,
        workloadName: "cockroach",
        applicationType:"Statefulset",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/master/production/mongo-jiva/mongo-jiva-namespace.yaml",
        workloadyaml: "https://github.com/openebs/e2e-infrastructure/blob/master/production/mongo-jiva/mongo-jiva-mongo.yaml"
    });
});

router.get('/yaml/wordpress-nfs', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "wordpress",
        applicationType:"Deployment",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-mongo.yaml"
 });
});

router.get('/yaml/prometheus-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "prometheus",
        applicationType:"Deployment",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/percona-cstor/percona-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/percona-cstor/percona-openebs-deployment.yaml"
 });
});
router.get('/yaml/grafana-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "grafana",
        openebsEngine:"cstor",
        applicationType:"Deployment",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/4c5c1761d8b710d16d755aece92eb2539eed73d6/production/grafana-cstor/grafana-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/4c5c1761d8b710d16d755aece92eb2539eed73d6/production/grafana-cstor/grafana-cstor-deployment.yaml"
 });
});
router.get('/yaml/mongo-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "mongo",
        openebsEngine:"cstor",
        applicationType:"Statefulset",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-mongo.yaml"
 });
});
router.get('/yaml/percona-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "percona",
        openebsEngine:"cstor",
        applicationType:"Deployment",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-mongo.yaml"
 });
});
router.get('/yaml/prometheus-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "prometheus",
        openebsEngine:"cstor",
        applicationType:"Deployment",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-mongo.yaml"
 });
});
module.exports = router;