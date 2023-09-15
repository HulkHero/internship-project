
const Project = require('../models/Project.model');
const User = require('../models/User.model');

const addProject = async (req, res) => {

    try {
        const { projectName, projectDescription, teamName, projectMembers, projectStartDate, projectEndDate, } = req.body;
        console.log(req.body, "req.body")
        const companyName = req.companyName;
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
            companyName
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

const getPaginatedProjects = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skip = (page) * limit; // Adjusted skip calculation
        const companyName = req.companyName; // Assuming you have a company name in the request

        const projects = await Project.aggregate([
            {
                $match: { companyName: companyName }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'projectManager',
                    foreignField: '_id',
                    as: 'projectManager'
                }
            },
            {
                $unwind: '$projectManager'
            },
            {
                $project: {
                    _id: 1,
                    projectName: 1,
                    teamName: 1,
                    projectManager: {
                        _id: 1,
                        firstName: 1,
                        lastName: 1
                    },
                    projectDescription: 1,
                    projectStartDate: 1,
                    projectEndDate: 1,
                    projectStatus: 1,
                    projectMembers: 1
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ]);
        console.log(projects, "projects")
        const total = await Project.countDocuments({ companyName: companyName });


        const hasMore = (page + 1) * limit < total;

        return res.status(200).json({
            data: projects,
            hasMore: hasMore,
            total: total
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });

    };
}
const getSingleProject = async (req, res) => {
    try {
        const _id = req.params._id
        const companyName = req.companyName
        const project = await Project.findOne({ companyName: companyName, _id: _id })
            .populate("projectManager", "_id firstName lastName techRole systemRole")
            .populate({ path: "projectMembers.member", select: "_id firstName lastName techRole systemRole" })
            .select({ _id: 1, projectName: 1, projectDescription: 1, projectManager: 1, projectMembers: 1, projectEndDate: 1, projectStartDate: 1, projectStatus: 1 })
            .lean()
            .exec()
        if (project) {
            console.log(project, "project")
            // const evaluation=Evaluation.find({companyName,,project_id:_id})
            return res.status(200).json({ data: project })
        } else {
            return res.status(400).json({ msg: "Project Not Found" })
        }

    } catch (err) {
        return res.status(400).json({ msg: "something went wrong", err: err.message })

    }
}



module.exports = { addProject, getPaginatedProjects, getSingleProject }