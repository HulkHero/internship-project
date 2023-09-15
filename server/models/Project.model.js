const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = Schema({
    projectName: {
        type: String,
        required: true
    },
    teamName: {
        type: String,
        required: true,
        lowercase: true,
    },
    projectManager: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    projectDescription: {
        type: String,
    },
    projectStartDate: {
        type: Date,
        required: true
    },
    projectEndDate: {
        type: Date,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    projectStatus: {
        type: String,

        enum: ['Not Started', 'In Progress', 'Completed', 'Closed']
    },
    projectMembers: [{
        member: { type: Schema.Types.ObjectId, ref: 'Users' },
        isEvaluated: {
            type: Boolean,
            default: false
        },
        evaluation: { type: Schema.Types.ObjectId, ref: 'Evaluations' },
    }],
}, {
    timestamps: true
});




const Project = mongoose.model('Projects', projectSchema, "projects");

module.exports = Project;

