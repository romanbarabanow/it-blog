const { Schema, model } = require("mongoose");

const Message = new Schema({
  author: { type: String, required: true },
  message: { type: String, required: true },
  roomId: { type: String, required: true },
});

module.exports = model("Message", Message);
