const { Schema, model } = require("mongoose");

const RoomsForMessage = new Schema({
  room_id: { type: String, required: true },
  name: { type: String, required: true },
  myName: { type: String, required: true },
});

module.exports = model("RoomsForMessage", RoomsForMessage);
