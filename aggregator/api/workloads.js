
const express = require('express');
const router = express();

clusterDomain = process.env.CLUSTER_DOMAIN.split(' ');

router.get('/', (req, res) => {

    res.status(200).json(clusterDomain);
});

module.exports = router;