
const express = require('express');
const router = express();


router.get('/yaml/mongo-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "MongoDB",
        openebsEngine:"cStor",
        applicationType:"Statefulset",
        dashboardurl:"#",
        urlApi:"https://workloads.openebs.ci/",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/mongo-cstor/mongo-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/mongo-cstor/mongo-cstor-mongo.yaml"
 });
});

router.get('/yaml/percona-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "Percona",
        openebsEngine:"cStor",
        applicationType:"Deployment",
        grafanaDashboard: "#",
        urlApi:"https://workloads.openebs.ci/",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/percona-cstor/percona-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/d536275e8c3d78f5c8ce1728b07eee26653b5056/production/percona-cstor/percona-openebs-deployment.yaml"
 });
});

router.get('/yaml/cockroachdb-cstor', (req, res) => {
    res.status(200).json({
        status: 200,
        workloadName: "CockroachDB",
        applicationType:"Statefulset",
        openebsEngine:"cStor",
        dashboardurl:"#",
        urlApi:"https://workloads.openebs.ci/",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/cockroachdb-cstor/cockroach-service.yaml",
        workloadyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/cockroachdb-cstor/cockroach-st.yaml"
    });
});

router.get('/yaml/wordpressnfs-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "Wordpress",
        openebsEngine:"cStor",
        applicationType:"Deployment",
        dashboardurl:"https://wordpress.openebs.ci/",
        urlApi:"https://workloads.openebs.ci/",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/wordpress-nfs/wordpress-nfs-namespaces.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/wordpress-nfs/nfs.yaml"
 });
});

router.get('/yaml/grafana-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "Grafana",
        openebsEngine:"cStor",
        applicationType:"Deployment",
        dashboardurl:"https://grafana.openebs.ci/",
        urlApi:"https://workloads.openebs.ci/",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/4c5c1761d8b710d16d755aece92eb2539eed73d6/production/grafana-cstor/grafana-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/grafana-cstor/grafana-cstor-deployment.yaml"
 });
});


router.get('/yaml/prometheus-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "Prometheus",
        openebsEngine:"cStor",
        applicationType:"Deployment",
        dashboardurl:"https://prometheus.openebs.ci",
        urlApi:"https://workloads.openebs.ci/",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/prometheus-cstor/prometheus-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/prometheus-cstor/openebs-monitoring-org.yaml"
 });
});


router.get('/yaml/redis-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "Redis",
        openebsEngine:"cStor",
        applicationType:"Statefulset",
        dashboardurl:"#",
        urlApi:"https://workloads.openebs.ci/",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/redis-cstor/redis-cstor_namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/redis-cstor/redis-statefulset.yaml"
 });
});


router.get('/yaml/postgresql-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "PostgreSql",
        openebsEngine:"cStor",
        applicationType:"Statefulset",
        dashboardurl:"#",
        urlApi:"https://workloads.openebs.ci/",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/postgresql-cstor/postgresql-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/postgresql-cstor/set.json"
 });
});


router.get('/yaml/nuodb-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "NuoDB",
        openebsEngine:"cStor",
        applicationType:"Statefulset",
        urlApi:"https://workloads.openebs.ci/",
        dashboardurl:"https://insights.nuodb.com/3N5YV375G0/",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/litmus/blob/master/apps/nuodb/deployers/nuodb.yaml"
 });
});
router.get('/yaml/minio-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "MINIO",
        openebsEngine:"cStor",
        applicationType:"StatefulSet",
        urlApi:"https://workloads.openebs.ci/",
        dashboardurl:"https://minio.openebs.ci/minio/",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/openebs/blob/master/k8s/demo/minio/minio.yaml"
 });
});
router.get('/yaml/default', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "GitLab",
        openebsEngine:"cStor",
        applicationType:"StatefulSet",
        urlApi:"https://workload-gitlab.openebs.ci/",
        dashboardurl:"https://gitlab.openebs.ci/openebs/",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/openebs/blob/master/k8s/demo/minio/minio.yaml"
 });
});
router.get('/yaml/logging', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "Elasticsearch",
        openebsEngine:"cStor",
        applicationType:"Statefulset",
        dashboardurl:"https://e2e-logs.openebs100.io/app/kibana#/discover?_g=()&_a=(columns:!(_source),index:cluster-logs,interval:auto,query:(language:lucene,query:''),sort:!('@timestamp',desc))",
        urlApi:"https://workload-gitlab.openebs.ci/",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/816ae44f1bd9c886ce506a72b542edcb323a50b3/production/mongo-cstor/mongo-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/54fe55c5da8b46503e207fe0bc08f9624b31e24c/production/efk-server/elasticsearch/es-statefulset.yaml"
 });
});
module.exports = router;
