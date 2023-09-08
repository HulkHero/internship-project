const Message = require("../models/Message.model");

const addMessage = async (req, res) => {
  const { chatId, senderId, text, receiverId } = req.body;
  const message = new Message({
    chatId,
    senderId,
    text,
    receiverId,
  });
  try {
    const result = await message.save();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await Message.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { addMessage, getMessages };
