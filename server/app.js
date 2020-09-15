require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const apiRouter = require("./api/router");
const authRouter = require("./api/auth");
const path = require("path");

const app = express();

// Configuration constants:
const API_ENDPOINT_BASE = "/api";
const AUTH_ENDPOINT_BASE = "/auth";
const PUBLIC_DIR_LOCATION = "../client/public";
const SERVER_HOST = process.env.SERVER_HOST;
const SERVER_PORT = process.env.PORT;

// middleware to parse post/patch request body
app.use(bodyParser.json());

// Client middleware
app.use(express.static(path.join(__dirname, PUBLIC_DIR_LOCATION)))

// Auth middleware
app.use(AUTH_ENDPOINT_BASE, authRouter);

// API middleware
app.use(API_ENDPOINT_BASE, apiRouter);

const initializeMongo = async () => {
    console.log("Connecting to Mongo:");
    // connect to DB
    await mongoose.connect(process.env.CONNECTION_URL, {useUnifiedTopology: true, useNewUrlParser: true, connectTimeoutMS:6000});
};

initializeMongo().then(() => {
    // start express server
    app.listen(SERVER_PORT, () => {
        console.log(`Server started at http://${SERVER_HOST}:${SERVER_PORT}`)
    })
}).catch((err) => {
    console.log(`Failed to connect to Mongo. Error: ${err}`);
});

