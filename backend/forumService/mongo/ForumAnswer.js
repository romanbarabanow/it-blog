const { Schema, model } = require("mongoose");

const ForumAnswer = new Schema({
  questionId: { type: String, required: true },
  author: { type: String, required: true },
  avatar: { type: String, default: "" },
  answer: { type: String, required: true },
});

module.exports = model("ForumAnswer", ForumAnswer);
