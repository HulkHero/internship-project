
const Project = require('../models/Project.model');

const addProject = async (req, res) => {
    const { projectName, projectDescription, teamName, projectMembers, projectStartDate, projectEndDate, } = req.body;
    console.log(req.body, "req.body")
    const projectManager = req._id;
    if (!projectName || !projectDescription || !projectMembers || !projectStartDate || !projectEndDate) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }
    const newProject = new Project({
        projectName,
        projectDescription,
        projectManager,
        teamName, teamName,
        projectMembers,
        projectStartDate,
        projectEndDate,
    })
    newProject.save().then(project => {
        return res.status(200).json({ msg: "Project Added Successfully" })
    })
        .catch(err => {
            return res.status(400).json({ msg: "Failed", err: err });
        })

}


module.exports = { addProject }