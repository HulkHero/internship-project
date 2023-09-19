
const User = require('../models/User.model');
const Project = require('../models/Project.model');
const Evaluation = require('../models/Evaluation.model');
const Kpi = require('../models/Kpi.model');

const stats = async (req, res) => {
    try {
        const companyName = req.companyName;

        const totalEmployees = await User.countDocuments({ companyName: companyName });

        const totalProjects = await Project.countDocuments({ companyName: companyName });

        const ProjectsThisMonth = await Project.countDocuments({ companyName: companyName, createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) } });

        const totalEvaluations = await Evaluation.countDocuments({ companyName: companyName });
        const EvaluationsThisMonth = await Evaluation.countDocuments({ companyName: companyName, createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) } });
        const unikueRoles = await Kpi.find({ companyName: companyName }).distinct('techRole')
        console.log(unikueRoles, 'unikueRoles')
        return res.status(200).json({ msg: "success", data: { totalEmployees, ProjectsThisMonth, EvaluationsThisMonth, totalProjects, totalEvaluations, unikueRoles } })
    }
    catch (err) {
        return res.status(400).json({ msg: "failed", err: err })
    }
}


module.exports = {
    stats
}