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
    required: true,
    minLength: 20,
    maxLength: 2000,
  },
  characteristics: {
    breed: {
      type: String,
    },
    age: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  images: [
    {
      url: { type: String },
      description: { type: String },
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Pet", PetSchema);
