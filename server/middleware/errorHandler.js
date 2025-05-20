// User made middleware 
//------ The middleware used by express , gives the error message in html text 
//------ So using this middleware we will convert that message into json formate 
//------ Thus making the developer reading the error message easy to read 

//Error Handlor ka middleware me 4 parameters aaenge ... ERR REQ RES NEXT

const { stack } = require("../routes/authRoutes");

const errorHandler = (err , req , res , next) => {
    const statusCode = res.statusCode <=200 ? 500 : res.statusCode

    
    res.status(statusCode)


    res.json({
        message : err.message , 
        stack : err.stack
    })
}

module.exports = errorHandler;