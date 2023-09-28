

const Evaluation = require('../models/Evaluation.model');
const User = require('../models/User.model');
const Project = require('../models/Project.model');

const addEvaluation = async (req, res) => {
    try {
        const { employeeId, managerId, projectId, type, kpis, score } = req.body;
        const companyName = req.companyName;

        const newkpis = kpis.map((kpi, index) => {
            return {
                ...kpi,
                kpiScore: score[index]
            }
        })

        const AverageScore = newkpis.reduce((acc, curr) => acc + (curr.kpiScore * (curr.kpiWeight * 0.1)), 0)
        const threshold = newkpis.reduce((acc, curr) => acc + (curr.kpiThreshold * (curr.kpiWeight * 0.1)), 0)
        const newEvaluation = new Evaluation({
            user_id: employeeId,
            manager_id: managerId,
            project_id: projectId,
            type,
            kpis: newkpis,
            score: AverageScore,
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
        return res.status(500).json({ msg: "Something Went Wrong", err: err.message });
    }


}

const getEvaluation = async (req, res) => {

}

module.exports = {
    addEvaluation,
    getEvaluation
}