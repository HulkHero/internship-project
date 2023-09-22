
const User = require('../models/User.model');
const Project = require('../models/Project.model');
const Evaluation = require('../models/Evaluation.model');
const Kpi = require('../models/Kpi.model');
const ObjectId = require('mongoose').Types.ObjectId;


const stats = async (req, res) => {
    try {
        const companyName = req.companyName;

        const totalEmployees = await User.countDocuments({ companyName: companyName });

        const totalProjects = await Project.countDocuments({ companyName: companyName });

        const ProjectsThisMonth = await Project.countDocuments({ companyName: companyName, createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) } });

        const totalEvaluations = await Evaluation.countDocuments({ companyName: companyName });
        const EvaluationsThisMonth = await Evaluation.countDocuments({ companyName: companyName, createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) } });
        const unikueRoles = await Kpi.find({ companyName: companyName }).distinct('techRole')
        return res.status(200).json({ msg: "success", data: { totalEmployees, ProjectsThisMonth, EvaluationsThisMonth, totalProjects, totalEvaluations, unikueRoles } })
    }
    catch (err) {
        return res.status(400).json({ msg: "failed", err: err })
    }
}


const charts = async (req, res) => {
    console.log("charts");
    try {
        console.log(req.query, "req.query")
        const companyName = req.companyName;
        const search = req.query.search.trim() || "";
        const type = req.query.type || "All";
        const role = req.query.role || "All";
        console.log(search, "search, type, role")

        if (search === "'" || search === null || search === undefined || search === "") {
            console.log("search is empty")
            // If search is empty, find the top employee for the specified role and type


            const matchStage = {
                companyName: companyName, // Match by role,
                ...(role !== "All" ? { techRole: role } : {}),
            }

            const matchStage2 = {
                ...(type === "All" ? {} : { "evaluation.type": type }),
            }
            const topEmployee = await User.aggregate([
                {
                    $match: {
                        companyName: companyName,
                        ...(role === "All" ? {} : { techRole: role })
                    } // Match by role
                },
                {
                    $lookup: {
                        from: "evaluation", // Replace with your actual collection name
                        localField: "_id",
                        foreignField: "user_id",
                        as: "evaluation"
                    }
                },
                {
                    $unwind: "$evaluation"
                },
                {
                    $match: {
                        ...(type === "All" ? {} : { "evaluation.type": type })
                    }
                }, {
                    $group: {
                        _id: "$_id", // Group by user ID
                        firstName: { $first: "$firstName" }, // You can include other user fields as needed
                        lastName: { $first: "$lastName" },
                        systemRole: { $first: "$systemRole" },
                        techRole: { $first: "$techRole" },
                        averageScore: { $avg: "$evaluation.score" }, // Calculate the average score
                        evaluation: { $push: "$evaluation" } // Collect "15Day" evaluations into an array
                    }
                },
                {
                    $addFields: {
                        averageScore: {
                            $avg: "$evaluation.score"
                        }
                    }
                },
                {
                    $sort: { averageScore: -1 }
                },
                {
                    $limit: 1
                },
                {
                    $project: {
                        _id: 1,
                        firstName: 1,
                        lastName: 1,
                        systemRole: 1,
                        techRole: 1,
                        averageScore: 1,
                        evaluation: {
                            type: 1,
                            score: 1,
                            threshold: 1,
                            kpis: 1,
                            createdAt: 1
                        }
                    }
                }

            ]);

            if (topEmployee.length === 0) {
                return res.status(404).json({ msg: "No top employee found" });
            }
            topEmployee[0].averageScore = topEmployee[0].averageScore.toFixed(2)
            console.log(topEmployee[0].evaluation, "topEmployee[0].evaluation")

            return res.status(200).json({ msg: "success", data: topEmployee[0] });
        }
        else {
            // Step 1: Query the user collection based on the search criteria


            const userAggregate = await User.aggregate([
                {
                    $match: {
                        companyName: companyName,
                        _id: new ObjectId(search),
                        ...(role === "All" ? {} : { techRole: role })
                    }

                }, {
                    $lookup: {
                        from: "evaluation", // Replace with your actual collection name
                        localField: "_id",
                        foreignField: "user_id",
                        as: "evaluation"
                    }
                },
                {
                    $unwind: "$evaluation"
                },
                {
                    $match: {
                        // "evaluation.type": "15Day",
                        ...(type === "All" ? {} : { "evaluation.type": type })
                    }
                },
                {
                    $group: {
                        _id: "$_id", // Group by user ID
                        firstName: { $first: "$firstName" }, // You can include other user fields as needed
                        lastName: { $first: "$lastName" },
                        systemRole: { $first: "$systemRole" },
                        techRole: { $first: "$techRole" },
                        averageScore: { $avg: "$evaluation.score" }, // Calculate the average score
                        evaluation: { $push: "$evaluation" } // Collect "15Day" evaluations into an array
                    }
                },
                {
                    $limit: 1

                }, {
                    $project: {
                        _id: 1,
                        firstName: 1,
                        lastName: 1,
                        systemRole: 1,
                        techRole: 1,
                        averageScore: 1,
                        evaluation: {
                            type: 1,
                            score: 1,
                            threshold: 1,
                            kpis: 1,
                            createdAt: 1

                        }
                    }
                }
            ])
            if (userAggregate.length === 0) {
                return res.status(404).json({ msg: "No data found" });
            }

            console.log(userAggregate, "userAggregate")
            userAggregate[0].averageScore = userAggregate[0].averageScore.toFixed(2)
            return res.status(200).json({ msg: "success", data: userAggregate[0] });
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: "failed", err: err.message });
    }
};


const managersChart = async (req, res) => {
    try {

        const companyName = req.companyName;

        const managers = await User.aggregate([
            {
                $match: {
                    companyName: companyName,
                    systemRole: {
                        $in: ["manager", "admin"]
                    }
                }
            }, {
                $lookup: {
                    from: "projects",
                    localField: "_id",
                    foreignField: "projectManager",
                    as: "projects"
                }

            }, {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    systemRole: 1,
                    techRole: 1,
                    projectsSize: {
                        $size: "$projects",

                    },
                    projects: 1
                }
            }
        ])
        console.log(managers, "managers")

        if (managers.length === 0) {
            return res.status(404).json({ msg: "No data found" });
        }

        return res.status(200).json({ msg: "success", data: managers });


    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: "failed", err: err.message });
    }

}

const projectsTime = async (req, res) => {
    try {

        const companyName = req.companyName

        const projects = await Project.aggregate([
            {
                $match: {
                    companyName: companyName
                }
            }, {
                $addFields: {
                    completed: {
                        $gte: ["$projectEndDate", new Date()]
                    }
                }
            },
            {
                $addFields: {
                    employeesSize: {
                        $size: "$projectMembers"
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    projectName: 1,
                    projectStartDate: 1,
                    projectEndDate: 1,
                    completed: 1,
                    employeesSize: 1
                }
            }
        ])

        if (projects.length === 0) {
            return res.status(404).json({ msg: "No data found" });
        }

        return res.status(200).json({ msg: "success", data: projects });

    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: "failed", err: err.message });
    }

}

module.exports = {
    stats,
    charts,
    managersChart,
    projectsTime
}