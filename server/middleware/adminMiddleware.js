const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const jwt = require('jsonwebtoken')

const adminProtect = expressAsyncHandler(async(req , res , next) => {

    let token
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(" ")[1]

            let decoded = jwt.verify(token , process.env.JWT_SECRET)
            // console.log(decoded)
            req.user = await User.findById(decoded.id).select("-password")
            if(req.user.isAdmin){
                next()
            }
            else{
                res.status(401)
                throw new Error("Invalid request :Admin Only")
            }
        }
        else{
            res.status(401)
            throw new Error("Invalid request :Admin Only")
        }
        
        

    } catch (error) {
        res.status(401)
        throw new Error("Invalid request : Admin only")
    }

})

module.exports = adminProtect ;