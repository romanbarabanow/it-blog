const Post = require("../../mongo/Post");
const PostType = require("../types/PostType");
const { GraphQLString } = require("graphql");
const jwt = require("jsonwebtoken");

module.exports = {
  type: PostType,
  args: {
    id: { type: GraphQLString },
    token: { type: GraphQLString },
    img_link: { type: GraphQLString },
    tittle: { type: GraphQLString },
    text: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const name = jwt.decode(args.token, "superseckerkey");
    const post = await Post.findOneAndUpdate(
      { _id: args.id },
      {
        name: name.name,
        img_link: args.img_link,
        tittle: args.tittle,
        text: args.text,
      }
    );
    return {
      id: post.id,
      name: name.name,
      img_link: args.img_link,
      tittle: args.tittle,
      text: args.text,
    };
  },
};
