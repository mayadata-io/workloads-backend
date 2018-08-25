const mongoConnection = require("mongoose");

// MongoDB URL for database connection
// const dbHost = "mongodb://127.0.0.1:27017/maya";
const dbHost = `${process.argv[2]}/maya`;
console.log(dbHost);

// Connect to mongodb
mongoConnection.connect(dbHost);

module.exports = mongoConnection;
