const JWT = require("jsonwebtoken");

const User = require("../models/User.model");
const authentication = async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];
    let isAuthenticated;
    isAuthenticated = JWT.verify(token, process.env.JWT_SECRET);
    if (isAuthenticated) {
        const decodedToken = JWT.decode(token)
        const randomString = decodedToken.randomString;
        const role = decodedToken.systemRole;

        const employee = await User.findById(decodedToken._id);
        if (employee.tokenString === randomString) {
            console.log("user is authenticated");
            req.companyName = decodedToken.companyName;
            req._id = decodedToken._id;
            req.systemRole = role;
            next();
        }
        else {
            return res.status(401).json({ msg: "Invalid user" })
        }



    }

    else {
        return res.status(400).send({ msg: "invalid user" })
    }


}





module.exports = authentication;