const Post = require("../models/Post");

const filterPost = (item) => {
  const post = [];
  item.map((el) => {
    post.push({
      id: el.id,
      name: el.name,
      text: el.text,
      tittle: el.tittle,
      likes: el.likes,
    });
  });
  return post;
};

const createPost = async (req, res) => {
  const { text, tittle } = req.body;
  const post = new Post({
    name: req.name,
    text,
    tittle,
  });
  post.save();
  res.json({ message: "Success" }).status(200);
};

const allPost = async (req, res) => {
  const posts = await Post.find();
  if (posts.length === 0) {
    return res.json({ message: "There are no posts" }).status(200);
  }
  const postItem = filterPost(posts);
  res.json(postItem).status(200);
};

const profilePost = async (req, res) => {
  const usersPosts = await Post.find({ name: req.name });
  if (usersPosts.length === 0) {
    return res.json({ message: "There are no posts here" }).status(400);
  }
  const posts = filterPost(usersPosts);
  res.json(posts).status(200);
};

const deletePost = async (req, res) => {
  const { id } = req.body;
  const isExist = await Post.findOne({ _id: id, name: req.name });
  if (isExist === null) {
    return res.json({ message: "Post not found" }).status(400);
  }
  await Post.deleteOne({ _id: id });
  res.json({ message: "Success" }).status(200);
};

const updatePost = async (req, res) => {
  const { id, tittle, text } = req.body;
  const post = await Post.findOne({ _id: id, name: req.name });
  if (post === null) {
    res.json({ message: "Post not found" }).status(400);
  }
  await Post.findOneAndUpdate(
    { _id: id, name: req.name },
    { tittle: tittle, text: text }
  );
  res.json({ message: "Success" }).status(200);
};

const likePost = async (req, res) => {
  const { id } = req.body;
  const isExist = await Post.findOne({ _id: id });
  if (isExist === null) {
    res.json({ message: "No such posts" }).status(400);
  }

  await Post.findOneAndUpdate({ _id: id }, { likes: isExist.likes + 1 });

  res.json({ message: "Success" }).status(200);
};

const unlikePost = async (req, res) => {
  const { id } = req.body;
  const isExist = await Post.findOne({ _id: id });
  if (isExist === null) {
    res.json({ message: "No such posts" }).status(400);
  }
  if (isExist.likes > 0) {
    await Post.findOneAndUpdate({ _id: id }, { likes: isExist.likes - 1 });
  }
  res.json({ message: "Success" }).status(200);
};

const userPost = async (req, res) => {
  const { name } = req.body;
  const isExist = await Post.find({ name });
  if (isExist.length === 0) {
    return res.json({ message: "No posts" }).status(200);
  }
  const posts = filterPost(isExist);
  res.json(posts).status(200);
};

module.exports = {
  createPost,
  allPost,
  profilePost,
  deletePost,
  updatePost,
  likePost,
  unlikePost,
  userPost,
};
