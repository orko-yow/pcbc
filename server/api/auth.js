require("dotenv/config");
const express = require("express");
const auth = express.Router();
const jwt = require("jsonwebtoken");

// very basic jwt login mechanism. Uses user information from .env file
auth.post('/login', (req, res) => {
	let userName = req.body.username;
	let secret = req.body.secret;
	if (userName && secret) {
		const userInfo = userName + ":" + secret
		if (userInfo === process.env.ALLOWED_USER) {
			const accessToken = jwt.sign({ user: userInfo }, process.env.ACCESS_TOKEN_SECRET, { expiresIn:10*60 });
			res.json({ status: 200, message: "Authentication successful", accessToken: accessToken });
			return;
		}
	}
	res.json({status: 401, message: "Authentication failed."});
});

module.exports = auth;