const User = require("../schemas/User");
const Pet = require("../schemas/Pet");

//Create pet
const createPet = async (req, res) => {
  try {
    const { name, pet_type, description, characteristics, images, owner } =
      req.body;
    const pet = await Pet.create({
      name,
      pet_type,
      description,
      characteristics,
      images,
      owner,
    });
    //Push pet to user document
    const user = await User.findById(owner);
    user.pets.push(pet._id);
    //Save updated user document in DB
    await user.save();
    res.status(201).json({ message: "Pet added succesfully!", data: pet });
  } catch (error) {
    res.status(500).json({ error });
  }
};

//Get all pets
const getAllPets = async (req, res) => {
  try {
    //populating the owner schema
    const pets = await Pet.find().populate("owner");
    if (!pets.length) {
      res.status(200).json({ message: "No pets in the DB" });
    } else {
      res.status(200).json({ data: pets });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

//Get one pet
const getOnePet = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findById(id).populate("owner");
    if (!pet) {
      res.status(404).json({ message: "I don't know that pet" });
    } else {
      res.status(200).json({ data: pet });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

//Update pet
const updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, pet_type, description, characteristics, images } = req.body;

    const pet = await Pet.findByIdAndUpdate(
      id,
      { name, pet_type, description, characteristics, images },
      { new: true }
    );

    if (!pet) {
      res.status(404).json({ message: "This pet is not here anymore" });
    } else {
      res.status(200).json({ message: "Pet updates successfully", data: pet });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findOneAndDelete(id).populate("owner");
    if (!pet) {
      res.status(404).json({ message: "I don't know that pet" });
    } else {
      //Remove pet from user document
      const user = await User.findById(pet.owner);
      user.pets.pull(pet._id);
      //save updated user document in DB
      await user.save();
      res.status(200).json({ message: "Pet deleted" });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

module.exports = {
  createPet,
  getAllPets,
  getOnePet,
  updatePet,
  deletePet,
};
