
const Project = require('../models/Project.model');
const User = require('../models/User.model');

const addProject = async (req, res) => {

    try {
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
        const newP = await newProject.save()
        if (newP) {
            console.log(newP, "newP")
            const user = await User.findOneAndUpdate({ _id: req._id }, { $push: { Projects: newP._id } })
            return res.status(200).json({ msg: "Project added successfully", data: newP })

        }


    }
    catch (err) {
        return res.status(400).json({ msg: "Failed", err: err });
    }

}


module.exports = { addProject }