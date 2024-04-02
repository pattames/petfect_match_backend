const User = require("../schemas/User");
const jwt = require("jsonwebtoken");

//Create a user
// const createUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.create({
//       email,
//       password,
//     });
//     res.status(201).json({
//       message: "User created successfully!",
//       data: user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error,
//     });
//   }
// };

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
  try {
    const { id } = req.params;
    const { name, image, info, preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { name, image, info, preferences },
      { new: true }
    );
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

//Create token
const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET, { expiresIn: "1h" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    //get rid of token after testing
    res.status(200).json({ email, token, message: "Login successfull" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    const token = createToken(user._id);

    //get rid of token response after testing
    res
      .status(200)
      .json({ email, token, message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getOneUser, updateUser, loginUser, signupUser };
