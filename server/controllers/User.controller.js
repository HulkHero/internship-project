const crypto = require("crypto");
const User = require("../models/User.model");
const signToken = require("../helpers/signToken").signToken;

const addUser = async (req, res) => {
    const { firstName, lastName, email, password, techRole, systemRole, companyName } = req.body;
    console.log(req.body, "req.body")
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
        return res.status(400).json({ msg: "Oops,something went wrong" });
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
        return res.status(200).send({ msg: "No user found" })
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

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" })
        }
        console.log(email, password, "email, password")
        const user = await User.findOne({ email: email });
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
        }
    } catch (err) {
        return res.status(400).json({ msg: "Invalid Credentials" })
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
        return res.status(400).json({ msg: "Failed" });
    })
}

const getAllUsers = async (req, res) => {

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page) * limit;
    const companyName = req.companyName;

    // Use aggregation to fetch paginated users and total count
    const aggregationPipeline = [
        {
            $match: {
                companyName: companyName,
            },
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
    console.log(result, "result")
    const { paginatedUsers, total } = result[0];

    // Calculate 'hasMore' based on the total number of items and the current page
    const hasMore = (page + 1) * limit < total;


    res.status(200).json({
        data: paginatedUsers,
        page: page,
        limit: limit,
        total: total,
        hasMore: hasMore,
    });
}

const logout = async (req, res) => {
    try {
        const result = await User.findOneAndUpdate({ _id: req.user._id }, { $set: { tokenString: null } }).exec();
        if (result) {
            return res.status(200).json({ msg: "Logged out successfully" })
        }
    }
    catch (err) {
        return res.status(400).json({ msg: "Failed to logout" })
    }
}

module.exports = {
    addUser,
    userLogin,
    userSignup,
    checkEmail,
    searchUser,
    getAllUsers,
    logout
}