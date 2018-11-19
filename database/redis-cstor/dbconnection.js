var redis = require('redis');
var client = redis.createClient(6379, `redis.redis-cstor`);
client.on('connect',() => {
    console.log('Redis client connected');
});

client.on('error',(err) => {
    console.log('Something went wrong with Redis connection ' + err);
});
module.exports = client;
