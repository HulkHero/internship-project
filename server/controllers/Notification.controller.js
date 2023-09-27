const Notification = require("../models/Notification.modal");

//just to show message on 15 and 30 of every month

const add = async (req, res) => {
    const newNotification = new Notification({
        message: req.body.message
    });
    try {
        const result = await newNotification.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

const addNotification = (message) => {
    const newNotification = new Notification({
        message: message
    });
    try {
        const result = newNotification.save();
        return result;
    } catch (error) {
        return error;
    }
}

const remove = () => {
    try {
        const result = Notification.deleteMany({});
        return result;
    } catch (error) {
        return error;
    }
}

const get = async (req, res) => {
    try {
        const notification = await Notification.find({});
        res.status(200).json({ data: notification });

    } catch (error) {
        res.status(500).json({ data: [], error: "Something went wrong" });
    }
}

module.exports = { add, remove, get, addNotification };