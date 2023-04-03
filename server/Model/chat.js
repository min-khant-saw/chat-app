const mongoose = require("mongoose");

const ChatShema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

const ChatModel = mongoose.model("chat", ChatShema);

module.exports = ChatModel;
