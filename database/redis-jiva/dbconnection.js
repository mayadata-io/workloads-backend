var redis = require('redis');
var client = redis.createClient(6379, 10.36.2.185);
client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});
module.exports = client;
