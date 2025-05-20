const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const jwt = require('jsonwebtoken')

const protect = expressAsyncHandler(async(req , res , next) => {

    let token
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(" ")[1]

            let decoded = jwt.verify(token , process.env.JWT_SECRET)
            // console.log(decoded)
            req.user = await User.findById(decoded.id).select("-password")
            next()
        }
        else{
            res.status(401)
            throw new Error("Invalid request : No Token found !!")
        } 
        
        

    } catch (error) {
        res.status(401)
        throw new Error("Invalid request : No Token found !!")
    }

})

module.exports = protect ;