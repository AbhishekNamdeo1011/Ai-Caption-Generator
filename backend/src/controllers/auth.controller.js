const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
async function registerController(req, res) {
const { username, password } = req.body


    const isUser = await userModel.findOne({ 
        username, password
    })
    if (isUser) {
        return res.status(401).json({
            message: "username already exist"
        })
    }
    const user = await userModel.create({
        username,
         password:await bcrypt.hash(password,10)
    })
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)
    res.cookie("token", token)
    res.status(201).json({
        message: "user registered sucessfully",
        user,
    })
}

async function loginController(req, res) {
    const { username, password } = req.body

    const user = await userModel.findOne({
        username
    })
    if (!user) {
        return res.status(400).json({
            message: "User not found"
        });
    }
    const isPasswordvalid =await bcrypt.compare(password,user.password)
    if (!isPasswordvalid) {
        return res.status(400).json({
            message: "invalid passsword"
        })

    }
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)
    res.cookie("token", token)
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            username: user.username,
            id: user._id
        }
    })
}

module.exports = {
    registerController,
    loginController
}