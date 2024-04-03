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

app.route("/").get(getAllPets).post(createPet);

app
  .route("/:id")
  .get(getOnePet)
  .put(upload.array("images", 4), updatePet)
  .delete(deletePet);

// app.route("/?pet_type=dog").get(getDogs);

module.exports = app;
