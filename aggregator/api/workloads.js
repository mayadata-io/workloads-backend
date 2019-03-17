
const express = require('express');
const router = express();

clusterDomain = process.env.APP_NAME.split(' ');

router.get('/', (req, res) => {

    res.status(200).json(clusterDomain);
});

module.exports = router;