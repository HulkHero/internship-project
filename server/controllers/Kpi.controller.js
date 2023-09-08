
const Kpi = require('../models/Kpi.model');
const User = require('../models/User.model');

const addKpi = async (req, res) => {
    try {
        const { techRole, companyName, kpis } = req.body;
        console.log(req.body)
        const kpi = new Kpi({ techRole, companyName, kpiFields: kpis });
        console.log(kpi);
        const response = await kpi.save();
        return res.status(200).json({ msg: response });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

const getRoles = async (req, res) => {
    try {
        const { companyName } = req.query;
        const roles = await Kpi.find({ companyName: companyName }).distinct('techRole');
        return res.status(200).json({ roles: roles });


    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: err.message });
    }
}
module.exports = { addKpi, getRoles }