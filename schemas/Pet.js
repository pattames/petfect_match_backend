const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  pet_type: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
  },
  favorite_thing: {
    type: String,
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
  images: [
    {
      url: { type: String },
    },
  ],

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Pet", PetSchema);
