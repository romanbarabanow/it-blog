const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const { token } = req.query;
  if (!token) {
    return res.json({ message: "Auth Fail", token: token }).status(400);
  }
  const decodedtoken = jwt.decode(token, "superseckerkey");
  if (decodedtoken.email === null) {
    return res.json({ message: "Auth Fail" }).status(400);
  }
  const user = await User.findOne({ email: decodedtoken.email });
  if (user === null) {
    return res.json({ message: "Auth Fail" }).status(400);
  }
  const isValid = bcrypt.compare(decodedtoken.password, user.password);
  if (!isValid) {
    return res.json({ message: "Auth Fail" }).status(400);
  }
  req.email = user.email;
  req.name = user.name;
  next();
};

module.exports = authMiddleware;
