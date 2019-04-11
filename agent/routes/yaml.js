
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
        workloadyaml:"https://docs.openebs.io/docs/next/mongo.html"
 });
});

router.get('/yaml/percona-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "Percona",
        openebsEngine:"cStor",
        applicationType:"Deployment",
        grafanaDashboard: "#",
        dashboardurl:"",
        urlApi:"https://workloads.openebs.ci/",
        workloadyaml:"https://docs.openebs.io/docs/next/percona.html"
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
        workloadyaml:"https://docs.openebs.io/docs/next/rwm.html"
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
        workloadyaml:"https://docs.openebs.io/docs/next/prometheus.html"
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
        workloadyaml:"https://docs.openebs.io/docs/next/redis.html"
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
        workloadyaml:"https://docs.openebs.io/docs/next/postgres.html"
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
        workloadyaml:"https://docs.openebs.io/docs/next/nuodb.html"
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
        workloadyaml:"https://docs.openebs.io/docs/next/minio.html"
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
        workloadyaml:"https://docs.openebs.io/docs/next/gitlab.html"
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
        workloadyaml:"https://docs.openebs.io/docs/next/elasticsearch.html"
 });
});
router.get('/yaml/muleshop-cstor', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "MuleShop",
        openebsEngine:"cStor",
        applicationType:"Statefulset",
        dashboardurl:"https://muleshop.openebs.ci/",
        urlApi:"https://workloads.openebs.ci/",
        workloadyaml:""
 });
});
module.exports = router;
