const ChatModel = require("../../Model/chat");

const createChat = async (req, res) => {
  const { user1, user2 } = req.body;
  try {
    const chat = await ChatModel.create({
      members: [user1, user2],
    });
    res.json(chat);
  } catch (error) {
    res.json(error);
  }
};

const userChats = async (req, res) => {
  const { userId } = req.params;
  try {
    const chat = await ChatModel.findOne({
      members: { $in: userId },
    });
    res.json(chat);
  } catch (error) {
    res.json(error);
  }
};

const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    res.json(chat);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  createChat,
  userChats,
  findChat,
};
