const PostType = require("../types/PostType");
const Post = require("../../mongo/Post");
const { GraphQLString, GraphQLList } = require("graphql");
const jwt = require("jsonwebtoken");

const filterPosts = (el) => {
  const posts = [];
  el.map((post) => {
    posts.push({
      id: post.id,
      name: post.name,
      img_link: post.img_link,
      tittle: post.tittle,
      text: post.text,
    });
  });
  return posts;
};

module.exports = {
  type: new GraphQLList(PostType),
  args: {
    token: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const name = jwt.decode(args.token, "superseckerkey");
    const data = await Post.find({ name: name.name });
    if (data.length === 0) {
      throw new Error("Error");
    }
    const posts = filterPosts(data);

    return posts;
  },
};
