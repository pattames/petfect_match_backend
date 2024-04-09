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

app
  .route("/")
  .get(getAllPets)
  .post(requireAuth, upload.array("image", 4), createPet);

app
  .route("/:id")
  .get(requireAuth, getOnePet)
  .put(requireAuth, upload.array("image", 4), updatePet)
  .delete(requireAuth, deletePet);

// app.route("/?pet_type=dog").get(getDogs);

module.exports = app;
