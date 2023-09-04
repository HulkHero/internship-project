const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmployeesSchema = Schema({
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
        required: true
    },
    password: {
        type: String,
        required: true
    },
    techRole: {
        type: String,
        required: true,

    },
    isTeamLead: {
        type: Boolean,
        default: false
    },
    tokenString: {
        type: String,
        default: null
    },

    projects: [{ type: Schema.Types.ObjectId, ref: 'Projects', default: null }],
    tasksAssigned: [{ type: Schema.Types.ObjectId, ref: 'Tasks', default: null }],

});




const Employee = mongoose.model('Employees', EmployeesSchema, "employees");


module.exports = Employee;

