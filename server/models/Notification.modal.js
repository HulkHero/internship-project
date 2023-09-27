const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NotificationSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model("Notification", NotificationSchema, "notifications");
module.exports = Notification;
