require("dotenv/config");
const mongoose = require("mongoose");


const initializeMongo = async () => {
    console.log("Connecting to Mongo:");
    // connect to DB
    await mongoose.connect(process.env.CONNECTION_URL, {useUnifiedTopology: true, useNewUrlParser: true, connectTimeoutMS:6000});
};

module.exports = {
    initializeMongo:initializeMongo
};