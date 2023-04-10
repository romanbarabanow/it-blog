const { model, Schema } = require("mongoose");

const Commentary = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  postId: { type: String, required: true },
});

module.exports = model("Commentary", Commentary);
