
const Kpi = require('../models/Kpi.model');
const User = require('../models/User.model');

const addKpi = async (req, res) => {
    try {
        const { techRole, companyName, kpis } = req.body;
        if (!techRole || !companyName || !kpis) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        const alreadyPresent = await Kpi.findOne({ techRole: techRole, companyName: companyName });
        if (alreadyPresent) {
            return res.status(400).json({ msg: "KPIs already present for this role" });
        }


        const kpi = new Kpi({ techRole, companyName, kpiFields: kpis });

        const response = await kpi.save();
        return res.status(200).json({ msg: response });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

const getRoles = async (req, res) => {
    try {
        const companyName = req.companyName;
        const roles = await Kpi.find({ companyName: companyName }).distinct('techRole');
        return res.status(200).json({ roles: roles });


    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

const getKpi = async (req, res) => {
    try {
        const companyName = req.companyName;
        const techRole = req.params.techRole;
        const kpi = await Kpi.findOne({ companyName: companyName, techRole: techRole });
        console.log(kpi)
        return res.status(200).json({ data: kpi });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: err.message });
    }
}
module.exports = { addKpi, getRoles, getKpi }