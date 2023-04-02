const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const auth = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.json({ message: "Auth Fail" }).status(400);
  }
  const decodedtoken = jwt.decode(token, "superseckerkey");
  const user = await User.findOne({ email: decodedtoken.email });
  if (!user) {
    return res.json({ message: "Auth Fail" }).status(400);
  }
  const isValid = bcrypt.compareSync(decodedtoken.password, user.password);
  if (!isValid) {
    return res.json({ message: "Auth Fail" }).status(400);
  }
  res
    .json({
      name: user.name,
      email: user.email,
    })
    .status(200);
};

const registration = async (req, res) => {
  const { name, password, email } = req.body;
  const isExist = await User.findOne({ email: email });
  if (isExist) {
    return res.status(400).json({
      message: "Some Error",
    });
  }
  const hashPassword = await bcrypt.hash(password, 8);
  const user = new User({ name, email, password: hashPassword });
  const token = jwt.sign(
    {
      email,
      password,
    },
    "superseckerkey",
    {
      expiresIn: "1h",
    }
  );
  user.save();
  res.status(200).json({
    name,
    email,
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const users = await User.findOne({ email: email });
  if (!users) {
    res
      .json({
        message: "Some auth errors",
      })
      .status(400);
  }
  const isValid = bcrypt.compareSync(password, users.password);
  if (!isValid) {
    return res.status(400).json({
      message: "Some auth errors",
    });
  }
  const data = jwt.sign(
    {
      email,
      password: password,
    },
    "superseckerkey",
    {
      expiresIn: "1h",
    }
  );
  res
    .json({
      name: users.name,
      token: data,
    })
    .status(200);
};

const getAll = async (req, res) => {
  const data = await User.find();
  res.json({ data });
};

module.exports = {
  registration,
  getAll,
  login,
  auth,
};
