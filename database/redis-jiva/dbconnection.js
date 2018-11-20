var redis = require('redis');
var client = redis.createClient(6379, `redis.redis-jiva`);
client.on('connect',() => {
    console.log('Redis jiva client connected');
});

client.on('error',(err) => {
    console.log('Something went wrong with Redis jiva connection ' + err);
});
module.exports = client;
