const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db_config')
const errorHandler = require('./middleware/errorHandler')
require("dotenv").config()
const cors = require("cors")
const app = express()

const PORT = process.env.PORT || 5000


app.use(cors())
//DB CONNNECTION
connectDB()

//BODY-PARSER MIDDLEWARE (Jab req.body se jo payload aata he woh raw me aa skta he , ya encoded me aa skta he 
                        // Toh usse humara express server direct json payload me read nhi kar pata he toh issi
                        // liye hum body parser use krte he)

app.use(express.json())
app.use(express.urlencoded({extended : true }))

//DEFAULT ROUTES

app.get("/" , (req , res) => {
    res.json({
        msg : "Welcome to Wheelie API 1.0"
    })

})

//AUTH ROUTES
app.use("/api/auth" , require("./routes/authRoutes"))

//CAR ROUTES
app.use("/api/car" , require("./routes/carRoutes"))

//REVIEWS ROUTES through mergeParams in CarRoutes

//ADMIN ROUTES
app.use("/api/admin" , require("./routes/adminRoutes"))

//RENTAL ROUTES
app.use("/api/rentals" , require("./routes/rentRoutes"))



//ERROR HANDLER MIDDLEWARE (KHUDKA) 

app.use(errorHandler)


app.listen(PORT , ()=> {
    console.log(`Server is running at PORT : ${PORT}`.bgBlue)
    
})

