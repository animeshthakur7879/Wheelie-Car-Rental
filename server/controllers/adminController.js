const expressAsyncHandler = require("express-async-handler");
const Car = require("../models/carModel")
const Review = require("../models/reviewModel")
const Rental = require("../models/rentalModel")

const addCar = expressAsyncHandler( async(req , res) => {
    
    const {name , fuelType , category , rate , company , registration , carImage} = req.body

    if(!name || !fuelType || !category || !rate || !company || !registration){
        res.status(400)
        throw new Error("Please fill all details")
    }
    
    const car = await Car.create({name , fuelType , category , rate , company , registration , carImage})

    if(!car){
        res.status(400)
        throw new Error("Car not Created !!")
    }
    else{
        res.status(201).json(car)
    }

})

const updateCar = expressAsyncHandler(async(req , res) => {

    const updatedCar = await Car.findByIdAndUpdate(req.params.cid , req.body)

    if(!updatedCar){
        res.status(400)
        throw new Error("CAR cant be updated")
    }
    else{
        res.status(200).json(updatedCar)
    }
})

const removeCar = expressAsyncHandler(async(req , res) => {
    
    const removedCar = await Car.findByIdAndDelete(req.params.cid )

    if(!removedCar){
        res.status(400)
        throw new Error("Error deleting the car")
    }

    res.status(200).json(
        {
            message : "Car Deleted" , 
            id : req.params.cid
        }

    )


})

const getRentals = expressAsyncHandler(async (req , res) => {
    const rentals = await Rental.find().populate('user' , 'id , name , email').populate('car')

    if(!rentals){
        res.status(404)
        throw new Error("Rentals not found")
    }

    res.status(200).json(rentals)

})

const getAllUserReviews = expressAsyncHandler(async (req , res) => {
    const reviews = await Review.find().populate('user' , 'id , name , email').populate('car' , 'name , registration');

    if(!reviews){
        res.status(404)
        throw new Error("Reviews not found")
    }

    res.status(200).json(reviews)

})



module.exports = {addCar , updateCar , removeCar , getRentals , getAllUserReviews}