const Post = require("../../mongo/Post");
const PostType = require("../types/PostType");
const { GraphQLString } = require("graphql");
const jwt = require("jsonwebtoken");

module.exports = {
  type: PostType,
  args: {
    token: { type: GraphQLString },
    img_link: { type: GraphQLString },
    tittle: { type: GraphQLString },
    text: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const name = jwt.decode(args.token, "superseckerkey");
    console.log(name);
    const newPost = new Post({
      name: name.name,
      img_link: args.img_link,
      tittle: args.tittle,
      text: args.text,
    });
    console.log(args);
    await newPost.save();
    return {
      id: "",
      name: name.name,
      img_link: args.img_link,
      tittle: args.tittle,
      text: args.text,
    };
  },
};
