const tokenType = require("../types/TokenType");
const { GraphQLString } = require("graphql");
const User = require("../../mongo/User");
const jwt = require("jsonwebtoken");
const axios = require("axios");

module.exports = {
  type: tokenType,
  args: {
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const isExist = await User.findOne({ name: args.name });
    const isExistSecond = await User.findOne({ email: args.email });
    if (isExistSecond || isExist) {
      throw new Error("Error");
    }
    const mkdir = await axios.post("http://localhost:5000/create-dir", {
        name: args.name,
    });
    if(mkdir.data==='Already exist'){
      throw  new Error('Error')
    }
    const newUser = new User({
      name: args.name,
      email: args.email,
      password: args.password,
    });
    await newUser.save();
    const token = jwt.sign(
      {
        email: args.email,
        name: args.name,
      },
      "superseckerkey",
      {
        expiresIn: "1h",
      }
    );
    return {
      token: token,
      name: args.name
    };
  },
};
