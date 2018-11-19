
const express = require('express');
const router = express();

router.get('/yaml/mongo-jiva', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "mongo",
        applicationType:"Statefulset",
        openebsEngine:"Jiva",
        dashboardurl:"",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/master/production/mongo-jiva/mongo-jiva-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/d536275e8c3d78f5c8ce1728b07eee26653b5056/production/mongo-jiva/mongo-jiva-mongo.yaml"
 });
});

router.get('/yaml/percona-jiva', (req, res) => {
    res.status(200).json({
        status: 200,
        workloadName: "percona",
        applicationType:"Deployment",
        openebsEngine:"Jiva",
        dashboardurl:"",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/master/production/percona-jiva/percona-jiva-namespace.yaml",
        workloadyaml: "https://github.com/openebs/e2e-infrastructure/blob/d536275e8c3d78f5c8ce1728b07eee26653b5056/production/percona-jiva/percona-openebs-deployment.yaml"
    });
});

router.get('/yaml/cockroachdb-jiva', (req, res) => {
    res.status(200).json({
        status: 200,
        workloadName: "cockroachdb",
        applicationType:"Statefulset",
        openebsEngine:"Jiva",
        dashboardurl:"",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/master/production/mongo-jiva/mongo-jiva-namespace.yaml",
        workloadyaml: "https://github.com/openebs/e2e-infrastructure/blob/d536275e8c3d78f5c8ce1728b07eee26653b5056/production/cockroachdb-jiva/cockroach-st.yaml"
    });
});


router.get('/yaml/cockroachdb-cstor', (req, res) => {
    res.status(200).json({
        status: 200,
        workloadName: "cockroachdb",
        applicationType:"Statefulset",
        openebsEngine:"cStor",
        dashboardurl:"",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/master/production/mongo-jiva/mongo-jiva-namespace.yaml",
        workloadyaml: "https://github.com/openebs/e2e-infrastructure/blob/d536275e8c3d78f5c8ce1728b07eee26653b5056/production/cockroachdb-cstor/cockroach-st.yaml"
    });
});

router.get('/yaml/wordpress-nfs', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "wordpress",
        openebsEngine:"Jiva",
        applicationType:"Deployment",
        dashboardurl:"https://wordpressjiva.openebs.ci",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/d536275e8c3d78f5c8ce1728b07eee26653b5056/production/wordpress-nfs/wordpress.yaml"
 });
});

router.get('/yaml/grafana-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "grafana",
        openebsEngine:"cStor",
        applicationType:"Deployment",
        dashboardurl:"https://grafana-dashboard.openebs.ci/d/JOHe1vdiz/openebs-volume-stats?orgId=1",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/4c5c1761d8b710d16d755aece92eb2539eed73d6/production/grafana-cstor/grafana-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/d536275e8c3d78f5c8ce1728b07eee26653b5056/production/grafana-cstor/grafana-cstor-deployment.yaml"
 });
});
router.get('/yaml/mongo-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "mongo",
        openebsEngine:"cStor",
        applicationType:"Statefulset",
        dashboardurl:"",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/d536275e8c3d78f5c8ce1728b07eee26653b5056/production/mongo-cstor/mongo-cstor-mongo.yaml"
 });
});
router.get('/yaml/percona-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "percona",
        openebsEngine:"cStor",
        applicationType:"Deployment",
        dashboardurl:"",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/d536275e8c3d78f5c8ce1728b07eee26653b5056/production/percona-cstor/percona-openebs-deployment.yaml"
 });
});
router.get('/yaml/prometheus-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "prometheus",
        openebsEngine:"cStor",
        applicationType:"Deployment",
        dashboardurl:"https://prometheus-dashboard.openebs.ci/graph",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-mongo.yaml"
 });
});

router.get('/yaml/redis-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "redis",
        openebsEngine:"cStor",
        applicationType:"Statefulset",
        dashboardurl:"",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/d536275e8c3d78f5c8ce1728b07eee26653b5056/production/redis-cstor/redis-statefulset.yaml"
 });
});
router.get('/yaml/postgresql-jiva', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "postgresql",
        openebsEngine:"Jiva",
        applicationType:"Statefulset",
        dashboardurl:"",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/d536275e8c3d78f5c8ce1728b07eee26653b5056/production/postgresql-jiva/set.json"
 });
});

module.exports = router;
