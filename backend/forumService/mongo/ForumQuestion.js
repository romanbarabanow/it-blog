const { Schema, model } = require("mongoose");

const ForumQuestion = new Schema({
  author: { type: String, required: true },
  avatar: { type: String, default: "" },
  question: { type: String, required: true },
  answers: { type: Number, default: 0 },
  body: { type: String, required: true },
});

module.exports = model("ForumQuestion", ForumQuestion);
