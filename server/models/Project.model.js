const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = Schema({
    projectName: {
        type: String,
        required: true
    },
    teamName: {
        type: String,
        required: true
    },
    projectDescription: {
        type: String,
    },
    projectStartDate: {
        type: Date,
        required: true
    },
    projectDeadline: {
        type: Date,
        required: true
    },
    projectStatus: {
        type: String,
        required: true,
        enum: ['Not Started', 'In Progress', 'Completed', 'Closed']
    },
    assignedBy: { type: Schema.Types.ObjectId, ref: 'Users' },
    assignedTo: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Tasks' }],
}, {
    timestamps: true
});




const Project = mongoose.model('Projects', projectSchema, "projects");

module.exports = Project;

