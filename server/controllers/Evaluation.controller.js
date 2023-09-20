

const Evaluation = require('../models/Evaluation.model');
const User = require('../models/User.model');
const Project = require('../models/Project.model');

const addEvaluation = async (req, res) => {
    try {
        const { employeeId, managerId, projectId, type, kpis, } = req.body;
        const companyName = req.companyName;
        console.log(req.body, "req.body")

        const score = kpis.reduce((acc, curr) => acc + (curr.kpiScore * (curr.kpiWeight * 0.1)), 0)
        const threshold = kpis.reduce((acc, curr) => acc + (curr.kpiThreshold * (curr.kpiWeight * 0.1)), 0)
        const newEvaluation = new Evaluation({
            user_id: employeeId,
            manager_id: managerId,
            project_id: projectId,
            type,
            kpis,
            score,
            threshold,
            companyName
        })
        const newE = await newEvaluation.save()
        if (type == "project") {
            const updateProjects = Project.findOneAndUpdate({ _id: projectId, "projectMembers.member": employeeId }, { $set: { "projectMembers.$.isEvaluated": true, "projectMembers.$.evaluation": newE._id } }).lean().exec()
            if (updateProjects) {
                return res.status(200).json({ msg: "Evaluation added successfully", data: newE })
            }
        }
        else {
            return res.status(200).json({ msg: "Evaluation added successfully", data: newE })
        }

    } catch (err) {
        return res.status(400).json({ msg: "Failed", err: err });
    }


}

const getEvaluation = async (req, res) => {

}

module.exports = {
    addEvaluation,
    getEvaluation
}