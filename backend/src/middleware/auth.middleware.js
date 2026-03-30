const jwt = require("jsonwebtoken")
const userModel = require("../model/user.model")

async function authMiddleware(req, res,next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorised acess,please try again"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ _id: decoded._id || decoded.id });
        if (!user) {
            return res.status(401).json({ message: "User not found, please login again" });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token,please login again"
        });
    }

}

module.exports = authMiddleware