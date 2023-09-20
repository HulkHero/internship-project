
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
        // Define your Mongoose model for the user and evaluation collections


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
                    $match: matchStage2

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
                    $unwind: "$evaluation"
                },
                {
                    $sort: { "evaluation.score": -1 } // Sort evaluations by score in descending order
                },
                {
                    $limit: 1 // Get the top evaluation

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
                            kpis: 1
                        }


                    }
                }

            ]);
            console.log(topEmployee, "topEmployee")
            topEmployee[0].averageScore = topEmployee[0].averageScore.toFixed(2)
            // topEmployee[0].evaluation.forEach((element, index) => {
            //     element.kpis
            // });

            if (topEmployee.length === 0) {
                return res.status(404).json({ msg: "No top employee found" });
            }

            return res.status(200).json({ msg: "success", data: topEmployee[0] });
        }
        else {
            // Step 1: Query the user collection based on the search criteria
            const user = await User.findOne({
                companyName: companyName,
                name: { $regex: search, $options: 'i' }, // Case-insensitive search by name
                ...(role !== "All" ? { techRole: role } : {}),
            });
            console.log(user, "user")

            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }

            // Step 2: Query the evaluation collection based on the user's company name, type, and role
            const evaluationQuery = {
                companyName: companyName,
                userId: user._id, // Assuming you have a field to associate evaluations with users
                ...(type !== "All" ? { type: type } : {}),
                ...(role !== "All" ? { role: role } : {})
            };

            const evaluations = await Evaluation.find(evaluationQuery);

            // Step 3: Calculate the average score for the retrieved evaluations
            let totalScore = 0;
            let averageScore = 0;

            if (evaluations.length > 0) {
                totalScore = evaluations.reduce((acc, evaluation) => acc + evaluation.score, 0);
                averageScore = totalScore / evaluations.length;
            }

            return res.status(200).json({ msg: "success", user: user, averageScore: averageScore });
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: "failed", err: err.message });
    }
};


module.exports = {
    stats, charts
}