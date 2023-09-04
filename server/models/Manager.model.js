const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ManagerSchema = Schema({

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
        required: true
    },
    tokenString: {
        type: String,
        default: null
    },
    systemRole: {
        type: String,
        enum: ['admin', 'manager', 'employee'],
    },
    Projects: [{ type: Schema.Types.ObjectId, ref: 'Projects' }],
    Tasks: [{ type: Schema.Types.ObjectId, ref: 'Tasks' }],

});




const Manager = mongoose.model('Managers', ManagerSchema, "managers");


module.exports = Manager;

