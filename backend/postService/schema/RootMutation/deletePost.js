const Post = require("../../mongo/Post");
const MessageType = require("../types/MessageType");
const { GraphQLString } = require("graphql");
const jwt = require("jsonwebtoken");

module.exports = {
  type: MessageType,
  args: { id: { type: GraphQLString }, token: { type: GraphQLString } },
  async resolve(parent, args) {
    const name = jwt.decode(args.token, "superseckerkey");
    const deletePost = await Post.findOneAndDelete({
      _id: args.id,
      name: name.name,
    });
    if (deletePost === null) {
      throw new Error("Error");
    }
    return {
      message: "OK",
    };
  },
};
