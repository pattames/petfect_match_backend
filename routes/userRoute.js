const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const {
  getOneUser,
  updateUser,
  loginUser,
  signupUser,
} = require("../controllers/user");

const app = express.Router();

//Apply auth globally
// app.use(requireAuth);

// Apply auth locally
app.route("/:id").get(requireAuth, getOneUser).put(requireAuth, updateUser);

app.route("/login").post(loginUser);
app.route("/signup").post(signupUser);

module.exports = app;
