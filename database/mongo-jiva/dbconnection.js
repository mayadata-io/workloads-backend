const mongoConnection = require("mongoose");

// MongoDB URL for database connection
// const dbHost = "mongodb://127.0.0.1:27017/maya";
// const dbHost = `${process.argv[2]}/${process.argv[3]}`;
const dbHost = "mongodb://mongo.mongo-jiva/maya";
console.log(dbHost);
const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useMongoClient: true
};

var connectWithRetry = function() {
    return mongoConnection.connect(dbHost,options, function(err) {
      if (err) {
        console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
        setTimeout(connectWithRetry, 5000);
      }
    });
  };
  connectWithRetry();



module.exports = mongoConnection;
