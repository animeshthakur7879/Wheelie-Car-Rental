const expressAsyncHandler = require("express-async-handler");
const Car = require("../models/carModel")



const getCars = expressAsyncHandler(async (req , res) => {
    const cars = await Car.find()

    if(!cars){
        res.status(404)
        throw new Error("Cars Not Found !!")
    }
    else{
        res.status(200).json(cars)
    }
}
)

const getCar = expressAsyncHandler(async(req , res) => {
    const car = await Car.findById(req.params.id)

    if(!car){
        res.status(404)
        throw new Error("Cars Not Found !!")
    }
    else{
        res.status(200).json(car)
    }
}
)




module.exports = {getCars , getCar}