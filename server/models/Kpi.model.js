const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const kpiSchema = Schema({
    techRole: {
        required: true,
        type: String,
        unique: true,
        lowercase: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    kpiFields: [{
        _id: false,
        kpiName: {
            required: true,
            type: String,
            lowercase: true,
        },
        kpiWeight: {
            required: true,
            type: Number
        },
        kpiThreshold: {
            required: true,
            type: Number
        }
    }],
})

const Kpi = mongoose.model('Kpis', kpiSchema, "kpis");
module.exports = Kpi;