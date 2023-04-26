const User = require("../../mongo/User");
const tokenType = require("../types/TokenType");
const jwt = require("jsonwebtoken");
const { GraphQLString } = require("graphql");

module.exports = {
  type: tokenType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const user = await User.findOne({
      email: args.email,
      password: args.password,
    });
    if (user === null) {
      throw new Error("Error");
    }
    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
      },
      "superseckerkey",
      {
        expiresIn: "1h",
      }
    );
    return { token,name: user.name };
  },
};
