const mongoose = require("mongoose");

const MessageShema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("message", MessageShema);

module.exports = MessageModel;
