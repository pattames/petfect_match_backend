const User = require("../schemas/User");
const Pet = require("../schemas/Pet");

//Create pet
const createPet = async (req, res) => {
  console.log("ARE WE STARTING????");
  try {
    const {
      name,
      pet_type,
      description,
      favorite_thing,
      characteristics,
      owner,
    } = req.body;

    let images = []; // Initialize images array

    // Check if there are files uploaded and process them
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => ({
        url: file.path, // Assuming 'path' is where the file's URL/path is stored
        description: req.body.description, // You might want a different description for each image
      }));
    }
    console.log();
    const pet = await Pet.create({
      name,
      pet_type,
      description,
      favorite_thing,
      characteristics,
      images,
      owner,
    });
    console.log("WE ARE NICHT HIER");
    //Push pet to user document
    const user = await User.findById(owner);
    console.log("USER", user);
    user.pets.push(pet._id);
    console.log("SAVING PET:", pet);
    //Save updated user document in DB
    await user.save();
    res.status(201).json({ message: "Pet added succesfully!", data: pet });
  } catch (error) {
    res.status(500).json({ error });
  }
};

//Get all pets
const getAllPets = async (req, res) => {
  console.log("QUERY coming from FE: ", req.query);
  console.log("BODY?", req.body.filters);
  try {
    const pets = await Pet.find();

    let filtered;

    if (req.body.filters) {
      const filters = req.body.filters;
      filtered = pets.filter((pet) =>
        Object.entries(filters).every(([key, filterValue]) => {
          // Check for top-level attributes
          if (key in pet && pet[key] === filterValue) {
            return true;
          }

          // Check for nested 'characteristics'
          if (
            pet.characteristics &&
            key in pet.characteristics &&
            pet.characteristics[key] === filterValue
          ) {
            return true;
          }

          // If no condition matches, the filter does not apply to this pet; hence, exclude it
          return false;
        })
      );
    }

    if (!pets.length) {
      res.status(200).json({ message: "No pets in the DB" });
    } else {
      res.status(200).json({ data: req.body.filters ? filtered : pets });
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
    const { name, pet_type, description, favorite_thing, characteristics } =
      req.body;

    // Initialize update object with fields other than image
    let updateObject = {
      name,
      pet_type,
      description,
      favorite_thing,
      characteristics,
    };

    // If there's a file, it means image needs to be updated
    if (req.files) {
      const images = req.files.map((file) => ({
        url: file.path,
        description: req.body.description,
      }));
      updateObject.images = images;
    }

    const pet = await Pet.findByIdAndUpdate(id, updateObject, { new: true });

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
