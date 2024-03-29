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

//Get user

//Update user

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

    //get rid of token after testing
    res
      .status(200)
      .json({ email, token, message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
