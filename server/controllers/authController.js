const expressAsyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//Any notes , points to remember here are mentioned below : 

//1.Express inbuilt Error Handlor  =  throw new Error("Error msg") -
            //-----Yeh error handlor async function ke andar kaam nhi krega 
            //-----But we need async function to call controllers & other purpose 
            //-----So to resolev this conflicts we use *express-async-handler*
                                                //------To use this simple wrap the entire funtion
                                               //------Inside expressAsyncHandler()

//2. Bcryptjs 
            //-----Dependency to encrypt decrypt the password

//3. TOKEN GENERATION 
            //------Install JWT token


//----------REGISTRATION OF USER----------

const registerUser = expressAsyncHandler(async(req , res) => {

    //CHECK ALL FIELDS ARE COMING IN BODY.REQ
    const {name , phone , email , password} = req.body
    if(!name || !phone || !email || !password){
        res.status(400)
        throw new Error("Please fill all details !")
    }


    //CHECK IF USER ALREADY EXISTS (Phone & email should be unique)
    const emailExist = await User.findOne({email : email})
    const phoneExist = await User.findOne({phone : phone})

    if(emailExist || phoneExist){
        res.status(400)
        throw new Error("User ALready Exist")
    }

    //HASH PASSWORD USING BCRYPTJS
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password , salt)


    //CREATING NEW USER IN DATABASE
    const user = await User.create({
        name  , email  , phone , password : hashedPassword
    })

    if(!user){
        res.status(400)
        throw new Error ("User Not Created")
    }


    res.status(201).json({
        name : user.name , 
        email : user.email , 
        phone : user.phone ,
        id : user._id , 
        createdAt : user.createdAt ,
        token : generateToken(user._id),
        isAdmin : user.isAdmin
    })
}
)
//--------REGISTRATION END----------//



//----------LOGIN USER----------
const loginUser = expressAsyncHandler(async(req , res) => {

    //CHECK ALL FIELDS ARE COMING IN BODY.REQ
    const {email , password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("Please fill all details !")
    }

    //CHECK IS USER EXIXST IN THE DATABASE & LOGIN IT
    const user = await User.findOne({email})
    if(user && await bcrypt.compareSync(password , user.password)){
        res.status(201).json({
            name : user.name , 
            email : user.email , 
            phone : user.phone ,
            id : user._id , 
            createdAt : user.createdAt ,
            token : generateToken(user._id),
            isAdmin : user.isAdmin
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid credentials");
    
    } 
})

//----------LOGIN USER END----------



const privateController = expressAsyncHandler(async (req , res) => {

    res.json(req.user)

})


//------------TOKEN GENERATION------------//

const generateToken = (id) => {
    return jwt.sign({id : id} , process.env.JWT_SECRET , {expiresIn : "30d"})
}

module.exports = {registerUser , loginUser , privateController }