const crypto = require("crypto");
const User = require("../models/User.model");
const signToken = require("../helpers/signToken").signToken;
const Evaluation = require("../models/Evaluation.model");
const stripe = require('stripe')("sk_test_51Nj141DOsxvBXmWQCtDMZyeOlTOtsuDaI2nyz4up6j1YG4nKEvM6SF29Wi0sobNyTich0CStl4iBBC23gvBKyLPc00NX0Rtxnm");

const addUser = async (req, res) => {
    const { firstName, lastName, email, password, techRole, systemRole, companyName } = req.body;

    if (!firstName || !lastName || !email || !password || !techRole || !systemRole) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }
    if (systemRole !== "admin" && systemRole !== "employee" && systemRole !== "manager") {
        return res.status(400).json({ msg: "Please enter a valid systemRole" });
    }
    const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        techRole,
        companyName,
        systemRole: systemRole,
        addedBy: req.params.adminId
    })
    newUser.save().then(user => {
        res.status(200).json({
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                techRole: user.techRole,
                systemRole: user.systemRole,
                companyName: user.companyName,
            }
        })
    }).catch(err => {
        return res.status(500).json({ msg: "Oops,something went wrong" });
    })
}

const checkEmail = async (req, res) => {
    const email = req.params.email;
    const user = await User.find({ email: email }).exec();
    console.log(user, "user")
    if (user?.length > 0) {

        return res.status(200).send([user._id])
    }
    else {
        return res.status(400).send({ msg: "No user found" })
    }

}

const searchUser = async (req, res) => {
    const searche = req.params.searche;
    const companyName = req.companyName;
    console.log(searche, companyName, "searche")
    const users = await User.find({ companyName, firstName: { $regex: `^${searche}`, $options: "i" } }).select({ firstName: 1, lastName: 1, techRole: 1 }).lean().exec();
    console.log(users, "users")
    if (users?.length > 0) {
        return res.status(200).send(users)
    }
    else {
        return res.status(200).send([])
    }
}


const getPaginatedUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const searche = req.query.searche;
        const skip = (page) * limit;
        const companyName = req.companyName;

        const matchQuery = {
            companyName: companyName,
        };

        if (searche) {
            matchQuery.$or = [
                { firstName: { $regex: searche, $options: 'i' } },
                { lastName: { $regex: searche, $options: 'i' } }
            ];
        }

        const users = await User.find(matchQuery)
            .skip(skip)
            .limit(limit)
            .exec();

        const userIds = users.map(user => user._id);

        const currentDate = new Date();
        const fifteenDaysAgo = new Date(currentDate.getTime() - 15 * 24 * 60 * 60 * 1000);
        const thirtyDaysAgo = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);

        const evaluations15Day = await Evaluation.find({
            user_id: { $in: userIds },
            createdAt: { $gte: fifteenDaysAgo, $lte: currentDate },
            type: "15Day"
        }).exec();


        const evaluations30Day = await Evaluation.find({
            user_id: { $in: userIds },
            createdAt: { $gte: thirtyDaysAgo, $lte: currentDate },
            type: "30Day"
        }).exec();

        const mergedUsers = users.map(user => {
            const userEvaluations15Day = evaluations15Day.filter(evaluation => evaluation.user_id.toString() === user._id.toString());
            const userEvaluations30Day = evaluations30Day.filter(evaluation => evaluation.user_id.toString() === user._id.toString());


            const userWithEvaluations = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                companyName: user.companyName,
                systemRole: user.systemRole,
                techRole: user.techRole,
                Projects: user.Projects,
                has15DayEvaluation: userEvaluations15Day.length > 0,
                has30DayEvaluation: userEvaluations30Day.length > 0,
            };

            return userWithEvaluations;
        })



        const totalCount = await User.countDocuments(matchQuery);
        const hasMore = ((page + 1) * limit) < totalCount;

        res.status(200).json({
            data: mergedUsers,
            page: page,
            limit: limit,
            total: totalCount,
            hasMore: hasMore,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}






const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" })
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" })
        }
        if (password == user.password) {
            const buf = crypto.randomBytes(6);
            let randomString = buf.toString('utf-8');
            const dumyUser = await User.findOneAndUpdate({ email: email }, { $set: { tokenString: randomString } }).exec()
            console.log(dumyUser, "dumyUser")
            const user = {
                _id: dumyUser._id,
                firstName: dumyUser.firstName,
                lastName: dumyUser.lastName,
                email: dumyUser.email,
                companyName: dumyUser.companyName,
                systemRole: dumyUser.systemRole,
            }
            const signedToken = await signToken(user, randomString);
            return res.status(200).json({ user: { ...user, token: signedToken } })
        } else {
            return res.status(400).json({ msg: "Invalid Credentials" })
        }
    } catch (err) {
        return res.status(500).json({ msg: "Something went wrong" })
    }
}


const userSignup = async (req, res) => {

    console.log(req.body, "req.body")

    const { firstName, lastName, email, password, companyName, tier } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        companyName,
        systemRole: "admin",
        payment: {
            isPaid: true,
            tier: tier
        }
    })
    newUser.save().then(user => {
        return res.status(200).json({
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                companyName: user.companyName,
                isAdmin: user.isAdmin,
                payment: user.payment
            }
        })
    }).catch(err => {
        return res.status(500).json({ msg: "Failed" });
    })
}




const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const searche = req.query.searche;
        const skip = (page) * limit;
        const companyName = req.companyName;

        const matchStage = {
            companyName: companyName,
        };

        if (searche) {
            matchStage.$or = [
                { firstName: { $regex: searche, $options: 'i' } },
                { lastName: { $regex: searche, $options: 'i' } }
            ];
        }

        const countPipeline = [
            {
                $match: matchStage
            },
            {
                $count: 'total'
            }
        ];

        const countResult = await User.aggregate(countPipeline);
        const total = countResult.length > 0 ? countResult[0].total : 0;

        const aggregationPipeline = [
            {
                $match: matchStage
            },
            {
                $project: {
                    firstName: 1,
                    lastName: 1,
                    techRole: 1,
                    systemRole: 1,
                    email: 1,
                },
            },
            {
                $facet: {
                    paginatedUsers: [
                        { $skip: skip },
                        { $limit: limit },
                    ],
                    totalUsers: [
                        { $count: "count" },
                    ],
                },
            },
            {
                $unwind: "$totalUsers",
            },
            {
                $project: {
                    paginatedUsers: 1,
                    total: "$totalUsers.count",
                },
            },
        ];

        const result = await User.aggregate(aggregationPipeline);

        if (result.length > 0) {
            const { paginatedUsers } = result[0];
            const hasMore = ((page + 1) * limit) < total;

            res.status(200).json({
                data: paginatedUsers,
                page: page,
                limit: limit,
                total: total,
                hasMore: hasMore,
            });
        } else {
            // No results found
            res.status(200).json({
                data: [],
                page: page,
                limit: limit,
                total: 0,
                hasMore: false,
            });
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}



const logout = async (req, res) => {
    try {
        const result = await User.findOneAndUpdate({ _id: req._id }, { $set: { tokenString: null } }).exec();
        if (result) {
            return res.status(200).json({ msg: "Logged out successfully" })
        }
    }
    catch (err) {
        return res.status(500).json({ msg: "Failed to logout" })
    }
}

const changeSystemRole = async (req, res) => {
    try {
        const { _id, systemRole } = req.body;
        const result = await User.findOneAndUpdate({ _id }, { $set: { systemRole } }).exec();
        if (result) {
            return res.status(200).json({ msg: "System role changed successfully" })
        }
        else {
            return res.status(400).json({ msg: "Failed to change system role" })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "Failed to change system role" })
    }
}

const editNames = async (req, res) => {
    try {
        const { firstName, lastName, _id } = req.body
        const companyName = req.companyName;

        if (firstName && lastName) {
            console.log(firstName, lastName, _id, companyName, "firstName, lastName, _id, companyName")
            const updatedUser = await User.findOneAndUpdate({ _id: _id, companyName: companyName }, { firstName: firstName, lastName: lastName }, { new: true }).lean().exec()
            if (updatedUser) {
                return res.status(200).json({ data: updatedUser })
            }
        }
        else {
            return res.status(400).json({ msg: "Please enter all fields" })
        }

    }
    catch (err) {
        return res.status(500).json({ msg: "something went wrong" })

    }
}

const getCompanyName = async (req, res) => {
    try {
        const companyName = req.params.companyName;
        const company = await User.findOne({ companyName: companyName }).lean().exec();
        console.log(company, "company")
        if (company) {
            return res.status(200).json({ companyName: companyName })
        }
        return res.status(200).json({ companyName: null })
    }
    catch (err) {
        return res.status(500).json({ msg: "something went wrong" })

    }
}

const payment = async (req, res) => {
    try {


        const item = req.body;
        console.log(req.body)

        const line_items = [
            {
                'price_data': {
                    'currency': "usd",
                    'product_data': {
                        'name': item.name,
                    },
                    'unit_amount': item.price * 100,
                },
                'quantity': 1,
            }
        ]

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `http://localhost:3000/signup/success`,
            cancel_url: `http://localhost:3000/signup`,
        });
        if (!session) {
            res.status(500).send({ error: "Something went wrong" })
        }

        res.json({ id: session.id });
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: "Something went wrong" })
    }



}

module.exports = {
    addUser,
    userLogin,
    userSignup,
    checkEmail,
    searchUser,
    getAllUsers,
    logout,
    getPaginatedUsers,
    changeSystemRole,
    editNames,
    getCompanyName,
    payment: payment
}