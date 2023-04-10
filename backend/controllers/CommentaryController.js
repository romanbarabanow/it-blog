const Commentary = require("../models/Commentary");

const addCommentary = async (req, res) => {
  const { text, postId } = req.body;
  const isExist = await Commentary.findOne({ text, name: req.name, postId });
  if (isExist) {
    return res.json({ message: "This commentary is already exist" });
  }
  const commentary = new Commentary({
    text,
    postId,
    name: req.name,
  });
  commentary.save();
  res.json({ message: "Success" }).status(200);
};

const removeCommentary = async (req, res) => {
  const { id } = req.body;
  const isCommentaryExist = await Commentary.findOne({
    id: id,
    name: req.name,
  });
  if (isCommentaryExist === null) {
    return res.json({ message: "Commentary not found" });
  }
  await Commentary.findOneAndDelete({ id: id });
  res.json({ message: "Success" }).status(200);
};

const allCommentary = async (req, res) => {
  const { postId } = req.body;
  const posts = await Commentary.find({ postId });
  if (posts.length === 0) {
    return res.json({ message: "There are no commentarys here " });
  }
  res.json(posts).status(200);
};

module.exports = {
  addCommentary,
  removeCommentary,
  allCommentary,
};
