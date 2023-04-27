const { Schema, model } = require("mongoose");

const Commentary = new Schema({
  author: { type: String, required: true },
  message: { type: String, required: true },
  post_id: { type: String, required: true },
  avatar: { type: String, required: true },
});

module.exports = model("Commentary", Commentary);
