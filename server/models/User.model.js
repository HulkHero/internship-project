const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    tokenString: {
        type: String,
        default: null
    },
    payment: [{
        tier: {
            type: String,
        },
        isPaid: {
            type: Boolean,
            default: false
        }
    }],
    systemRole: {
        type: String,
        enum: ['admin', 'manager', 'employee'],
    },
    techRole: {
        type: String,
    },
    Projects: [{ type: Schema.Types.ObjectId, ref: 'Projects' }],


});




const User = mongoose.model('Users', userSchema, "users");


module.exports = User;

