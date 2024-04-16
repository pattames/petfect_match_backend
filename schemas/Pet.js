const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pet_type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    minLength: 20,
    maxLength: 2000,
  },
  favorite_thing: {
    type: String,
    minLength: 20,
    maxLength: 1000,
  },
  characteristics: {
    breed: {
      type: String,
    },
    age: {
      type: String,
    },
    size: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  image: {
    url: { type: String },
    description: { type: String },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Pet", PetSchema);
