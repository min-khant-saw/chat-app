const mongoose = require("mongoose");

const MessageShema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      require: true,
    },
    senderId: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
    file: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("message", MessageShema);

module.exports = MessageModel;
