const { mongoose } = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        car : {
            type : mongoose.Schema.Types.ObjectId ,
            ref : 'Car' ,
            required : true
        } , 
        user : {
            type : mongoose.Schema.Types.ObjectId ,
            ref : 'User' ,
            required : true
        } ,
        rating : {
            type : Number ,
            required : true ,
            default : 1
        } , 
        comment : {
            type : String , 
            required : true
        }
    } ,
    {
        timestamps : true
    }
)

module.exports = mongoose.model("Review" , reviewSchema)