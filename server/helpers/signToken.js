const JWT = require("jsonwebtoken");

const signToken = async (user, randomString) => {
    console.log(user, "user")
    const tokenData = {
        _id: user._id,
        systemRole: user.systemRole,
        companyName: user.companyName,
        randomString: randomString,
    };

    const signedToken = await JWT.sign(tokenData, process.env.JWT_SECRET);
    return signedToken;
};

module.exports = {
    signToken,
};
