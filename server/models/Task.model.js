const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = Schema({

    taskName: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,

    },
    taskStartDate: {
        type: Date,
        required: true
    },
    taskDeadline: {
        type: Date,
        required: true
    },
    taskStatus: {
        type: String,
        required: true,
        enum: ['Not Started', 'In Progress', 'Completed', 'Closed']
    },
    keyPerformanceIndex:
    {
        codeScalability: {
            type: Number,
        },
        codeReadability: {
            type: Number,
        },
        codePerformance: {
            type: Number,
        },
        cordination: {
            type: Number,
        },
        attitude: {
            type: Number,
        }
    },
    assignedBy: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Projects', required: true },
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema, "managers");
module.exports = Task;

