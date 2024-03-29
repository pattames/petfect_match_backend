const express = require("express");

const { loginUser, signupUser } = require("../controllers/user");

const app = express.Router();

app.route("/login").post(loginUser);
app.route("/signup").post(signupUser);

module.exports = app;
