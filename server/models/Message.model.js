const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MessageSchema = new mongoose.Schema(
    {
        chatId: {
            type: Schema.Types.ObjectId, ref: 'Chats', required: true
        },
        senderId: {
            type: Schema.Types.ObjectId, ref: 'User', required: true
        },
        text: {
            type: String,

        },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model("Message", MessageSchema, "messages");
module.exports = Message;
