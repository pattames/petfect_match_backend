const express = require("express");
const upload = require("../services/upload");
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
app.route("/:id").get(getOneUser).put(upload.single("image"), updateUser);

app.route("/login").post(loginUser);
app.route("/signup").post(signupUser);

module.exports = app;
