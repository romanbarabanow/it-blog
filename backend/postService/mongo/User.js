const { Schema, model } = require("mongoose");

const User = new Schema({
  name: { type: String, required: true },
  avatar_link: { type: String, default: "" },
  description: { type: String, default: "" },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = model("User", User);
