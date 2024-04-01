const express = require("express");

const {
  getOneUser,
  updateUser,
  loginUser,
  signupUser,
} = require("../controllers/user");

const app = express.Router();

app.route("/:id").get(getOneUser).put(updateUser);

app.route("/login").post(loginUser);
app.route("/signup").post(signupUser);

module.exports = app;
