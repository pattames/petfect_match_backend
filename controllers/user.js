const User = require("../schemas/User");
const jwt = require("jsonwebtoken");

//Create token
const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET, { expiresIn: "1h" });
};

//Signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    const token = createToken(user._id);

    //get rid of returning the token after testing
    res.status(200).json({
      _id: user._id,
      email,
      token,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    //get rid of returning the token after testing
    res
      .status(200)
      .json({ _id: user._id, email, token, message: "Login successfull" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get one user
const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    //populate is added to retrieve the entire pets object, and not only the ObjectId
    const user = await User.findById(id).populate("pets");
    if (!user) {
      res.status(404).json({ message: "I don't know that user" });
    } else {
      res.status(200).json({ data: user });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

//Update user
const updateUser = async (req, res) => {
  console.log("######################################");
  try {
    const { id } = req.params;
    const { name, info } = req.body;

    console.log("FILE", req.file);
    console.log("BODY", req.body);

    // Initialize update object with fields other than image
    let updateObject = { name, info: JSON.parse(info) };

    // If there's a file, it means image needs to be updated
    if (req.file && req.file.path) {
      updateObject.image = {
        url: req.file.path,
      };
    }

    const user = await User.findByIdAndUpdate(id, updateObject, { new: true });

    // const user = await User.findByIdAndUpdate(
    //   id,
    //   { name, image, info, preferences },
    //   { new: true }
    // );
    if (!user) {
      res.status(404).json({ message: "I don't know this user" });
    } else {
      res
        .status(200)
        .json({ message: "User updated successfully", data: user });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

module.exports = { getOneUser, updateUser, loginUser, signupUser };
