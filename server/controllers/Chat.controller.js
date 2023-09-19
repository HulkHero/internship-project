const Chat = require("../models/Chat.model");
const User = require("../models/User.model");
const createChat = async (req, res) => {
    companyName = req.companyName;
    const newChat = new Chat({
        companyName,
        members: [req.body.senderId, req.body.receiverId],
    });
    try {
        const result = await newChat.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const userChats = async (req, res) => {
    try {

        const chat = await Chat.find({
            companyName: req.companyName,
            members: { $in: [req.params.userId] },
        }).populate('members', '_id firstName lastName systemRole techRole')
            .select({ companyName: 1, _id: 1, members: 1 })
            .lean().exec();

        res.status(200).json(chat);
    } catch (error) {

        res.status(500).json(error);
    }
};

const findChat = async (req, res) => {
    try {
        const chat = await Chat.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] },
        });
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
};
const findChats = async (req, res) => {
    try {


        const user = await User.find({
            _id: { $in: req.body.chatIds }
        });


        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { createChat, userChats, findChat, findChats };