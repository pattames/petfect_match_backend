const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    url: { type: String },
    description: { type: String },
  },
  info: {
    location: {
      type: String,
    },
    space_available: {
      type: String,
    },
    space_type: {
      type: String,
    },
  },
  preferences: {
    pet_type: {
      type: String,
    },
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
  pets: [
    {
      //Reference to Pet schema:
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
    },
  ],
});

//Signup function
UserSchema.statics.signup = async function (email, password) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Make sure to use at least 8 characters, one upper case, one lower case, a number and a symbol"
    );
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

//Login function
UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email is incorrect or it doesn't exist");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", UserSchema);
