const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
    
    {
        name : {
            type : String ,
            required : [true , "Please Enter Name"]
        } , 
        email : {
            type : String ,
            unique : true ,
            required : true
        } ,
        phone : {
            type : String ,
            unique : true ,
            required : true
        } ,
        password : {
            type : String ,
            required : true
        } ,
        
        city : {
            type : String ,
         } ,
        license : {
            type : String 
        } ,
        isAdmin : {
            type : Boolean ,
            default : false ,
            required : true
        }

    } , 
    {
        timestamps : true
    }

)

module.exports = mongoose.model('User' , userSchema)