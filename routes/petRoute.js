const express = require("express");

const { createPet, getAllPets, getOnePet } = require("../controllers/pet");

const app = express.Router();

app.route("/").get(getAllPets).post(createPet);
app.route("/:id").get(getOnePet);

module.exports = app;
