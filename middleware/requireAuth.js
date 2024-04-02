const jwt = require("jsonwebtoken");
const User = require("../schemas/User");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "You're not authorized." });
  }

  //Auth in headers is always structured like so:"Bearer + token"
  //we need to get rid of the Bearer, split at the empty space and just give me the token [1]
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ error: "Not authorized." });
  }
};

module.exports = requireAuth;
