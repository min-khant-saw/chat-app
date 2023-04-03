const MessageModel = require("../../Model/message");

const addMessage = async (req, res) => {
  const { chatId, senderId, message } = req.body;
  try {
    const newMessage = await MessageModel.create({ chatId, senderId, message });
    res.json(newMessage);
  } catch (error) {
    res.json(error);
  }
};

const getMessage = async (req, res) => {
  const { chatId } = req.params;
  try {
    const message = await MessageModel.find({ chatId });
    res.json(message);
  } catch (error) {
    res.json(error);
  }
};

module.exports = { addMessage, getMessage };
