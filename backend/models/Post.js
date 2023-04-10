const { Schema, model } = require("mongoose");

const Post = new Schema({
  name: { type: String, required: true },
  tittle: { type: String, required: true },
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
});

module.exports = model("Post", Post);
