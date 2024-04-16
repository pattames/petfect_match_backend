const express = require("express");
const upload = require("../services/upload");
const requireAuth = require("../middleware/requireAuth");

const {
  createPet,
  getAllPets,
  getOnePet,
  updatePet,
  deletePet,
} = require("../controllers/pet");

const app = express.Router();

app.route("/").get(getAllPets).post(upload.array("images", 5), createPet);

app
  .route("/:id")
  .get(requireAuth, getOnePet)
  .put(requireAuth, upload.array("images", 4), updatePet)
  .delete(requireAuth, deletePet);

module.exports = app;
