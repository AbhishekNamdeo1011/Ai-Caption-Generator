const express = require("express")
const userModel =require("../model/user.model")
const routes = express.Router()
 const jwt = require("jsonwebtoken")
const { registerController, loginController } = require("../controllers/auth.controller")

routes.post('/register', registerController)
routes.post("/login", loginController)




module.exports = routes 
