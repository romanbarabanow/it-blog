const UserType = require("../types/UserType");
const { GraphQLString } = require("graphql");
const jwt = require("jsonwebtoken");
const User = require("../../mongo/User");

module.exports = {
  type: UserType,
  args: {
    token: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const userEmail = jwt.decode(args.token, "superseckerkey");
    const user = await User.findOne({ email: userEmail.email });
    if (user === null) {
      throw new Error("Error");
    }
    return {
      id: user.id,
      name: user.name,
      avatar_link: user.avatar_link,
      description: user.description,
      email: user.email,
      password: user.password,
    };
  },
};
