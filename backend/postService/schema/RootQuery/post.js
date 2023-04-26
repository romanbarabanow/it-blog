const Post = require('../../mongo/Post')
const PostType = require('../types/PostType')
const {GraphQLList, GraphQLString} = require('graphql')

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
  args: {name: {type: GraphQLString}},
  async resolve(parent,args){
    const data = await Post.find()
    const posts = filterPosts(data)
    return posts
  }
}