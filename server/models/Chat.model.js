const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chatRoomSchema = mongoose.Schema(
    {
        companyName: {
            type: String,
        },
        members: [{ type: Schema.Types.ObjectId, ref: 'Users', required: true }]
        ,
    }, {
    timestamps: true,
}
);
const Chat = mongoose.model("Chats", chatRoomSchema, "chats")

module.exports = Chat;

