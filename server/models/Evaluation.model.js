const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const evaluationSchema = Schema({

    user_id: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    manager_id: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    project_id: { type: Schema.Types.ObjectId, ref: 'Projects' },
    type: {
        type: String,
        enum: ['15Day', '30Day', 'project'],
    },
    kpis: [{
        kpiName: {
            type: String,
            required: true,
            lowercase: true,
        },
        kpiWeight: {
            type: Number,
            required: true,
        },
        kpiThreshold: {
            type: Number,
            required: true,
        },
        kpiScore: {
            type: Number,
            required: true,
        }
    }],
    score: {
        type: Number,
        required: true,
    },
    threshold: {
        type: Number,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});



const Evaluation = mongoose.model('Evaluations', evaluationSchema, "evaluation");

module.exports = Evaluation;

