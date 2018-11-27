
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
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/mongo-jiva/mongo-jiva-mongo.yaml"
 });
});
router.get('/yaml/mongo-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "mongo",
        openebsEngine:"cStor",
        applicationType:"Statefulset",
        dashboardurl:"",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/mongo-cstor/mongo-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/mongo-cstor/mongo-cstor-mongo.yaml"
 });
});
router.get('/yaml/percona-jiva', (req, res) => {
    res.status(200).json({
        status: 200,
        workloadName: "percona",
        applicationType:"Deployment",
        openebsEngine:"Jiva",
        dashboardurl:"",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/percona-jiva/percona-jiva-namespace.yaml",
        workloadyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/percona-jiva/percona-openebs-deployment.yaml"
    });
});
router.get('/yaml/percona-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "percona",
        openebsEngine:"cStor",
        applicationType:"Deployment",
        dashboardurl:"",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/percona-cstor/percona-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/d536275e8c3d78f5c8ce1728b07eee26653b5056/production/percona-cstor/percona-openebs-deployment.yaml"
 });
});
router.get('/yaml/cockroachdb-jiva', (req, res) => {
    res.status(200).json({
        status: 200,
        workloadName: "cockroachdb",
        applicationType:"Statefulset",
        openebsEngine:"Jiva",
        dashboardurl:"",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/cockroach-jiva/cockroachdb-jiva-namespace.yaml",
        workloadyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/cockroach-jiva/cockroach-st.yaml"
    });
});


router.get('/yaml/cockroachdb-cstor', (req, res) => {
    res.status(200).json({
        status: 200,
        workloadName: "cockroachdb",
        applicationType:"Statefulset",
        openebsEngine:"cStor",
        dashboardurl:"",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/cockroachdb-cstor/cockroach-service.yaml",
        workloadyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/cockroachdb-cstor/cockroach-st.yaml"
    });
});

router.get('/yaml/wordpress-nfs', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "wordpress",
        openebsEngine:"Jiva",
        applicationType:"Deployment",
        dashboardurl:"https://wordpressjiva.openebs.ci",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/wordpress-nfs/wordpress-nfs-namespaces.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/wordpress-nfs/nfs.yaml"
 });
});

router.get('/yaml/grafana-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "grafana",
        openebsEngine:"cStor",
        applicationType:"Deployment",
        dashboardurl:"https://grafana-dashboard.openebs.ci/",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/4c5c1761d8b710d16d755aece92eb2539eed73d6/production/grafana-cstor/grafana-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/grafana-cstor/grafana-cstor-deployment.yaml"
 });
});


router.get('/yaml/prometheus-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "prometheus",
        openebsEngine:"cStor",
        applicationType:"Deployment",
        dashboardurl:"",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/prometheus-cstor/prometheus-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/prometheus-cstor/openebs-monitoring-org.yaml"
 });
});
router.get('/yaml/prometheus-jiva', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "prometheus",
        openebsEngine:"cStor",
        applicationType:"Deployment",
        dashboardurl:"",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/prometheus-jiva/prometheus-jiva-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/prometheus-jiva/openebs-monitoring-org.yaml"
 });
});

router.get('/yaml/redis-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "redis",
        openebsEngine:"cStor",
        applicationType:"Statefulset",
        dashboardurl:"",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/redis-cstor/redis-cstor_namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/redis-cstor/redis-statefulset.yaml"
 });
});

router.get('/yaml/redis-jiva', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "redis",
        openebsEngine:"cStor",
        applicationType:"Statefulset",
        dashboardurl:"",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/Redis-jiva/redis-jiva_namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/Redis-jiva/redis-statefulset.yaml"
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
router.get('/yaml/postgresql-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "postgresql",
        openebsEngine:"cStor",
        applicationType:"Statefulset",
        dashboardurl:"",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/postgresql-cstor/postgresql-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/postgresql-cstor/set.json"
 });
});

router.get('/yaml/logging', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "elasticsearch",
        openebsEngine:"cStor",
        applicationType:"Statefulset",
        dashboardurl:"https://e2elogs.openebs.ci",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/efk-server/elasticsearch/es-statefulset.yaml"
 });
});

module.exports = router;
