const expressAsyncHandler = require("express-async-handler")
const Car = require("../models/carModel")
const User = require("../models/userModel")
const Rental = require("../models/rentalModel")

function calculateDateDifference(inputDate, outputDate) {
  // Parse the input dates (new format: yyyy-mm-dd)
  const parseDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
    // Month in JavaScript Date is 0-indexed (0 = January, 11 = December)
    return new Date(year, month - 1, day);
  };

  const startDate = parseDate(inputDate);
  const endDate = parseDate(outputDate);

  // Calculate the difference in milliseconds
  const diffInMs = endDate - startDate;

  // Convert milliseconds to days
  const diffInDays = Math.floor(diffInMs / 86400000);

  return diffInDays;
}


  //GET USER RENTALS
const getUserRentals = expressAsyncHandler(async(req ,res) => {

    const allRentals = await Rental.find({user : req.user._id}).populate('car').populate('user' , 'name , id , email')
    if(!allRentals){
        res.status(400)
        throw new Error("No Rentals found")
    }

    res.status(200).json(allRentals)

})

//ADD RENTAL
const addUserRental = expressAsyncHandler(async(req ,res) => {

    const {pickupDate , dropDate} = req.body

    if(!pickupDate || !dropDate){
        res.status(400)
        throw new Error("Please fill pickupdate & dropdate")
    }

    //Check if car selected through params id exixts??
    const carExist = await Car.findById(req.params.cid)
    if(!carExist){
        res.status(400)
        throw new Error("Inavlid Car Request!!")
    } 

    //Change later 
    let totalBill = calculateDateDifference(pickupDate , dropDate) * carExist.rate

    //check if car is available or not

    if(carExist.isBooked){
        res.status(400)
        throw new Error ("Car is Already booked!!")
    }
    

    const newRental = {
        user : req.user._id , car : req.params.cid , pickupDate , dropDate , totalBill
     }
 

     const addRental = await Rental.create(newRental);

     // Populate user and car after creation
     const populatedRental = await Rental.findById(addRental._id)
       .populate('user')   // Populates the user field
       .populate('car');   // Populates the car field
     
     // Update car rental status
     const updateStatus = await Car.findByIdAndUpdate(
       req.params.cid,
       { isBooked: true },
       { new: true }
     );
     
     if (!populatedRental || !updateStatus) {
       res.status(400);
       throw new Error("Car not booked");
     }
     
     res.status(200).json({
       rental: populatedRental,
       car: updateStatus,
     });

    })

//GET USER RENTAL
const getUserRental = expressAsyncHandler(async(req ,res) => {

    const singleRental = await Rental.findById(req.params.rid)
    if(!singleRental){
        res.status(400)
        throw new Error("No Rentals found")
    }

    res.status(200).json(singleRental)

})

//UPDATE RENTAL
const updateRental = expressAsyncHandler(async(req ,res) => {

    const {pickupDate , dropDate} = req.body

    if(!pickupDate || !dropDate){
        res.status(400)
        throw new Error("Kindly add Pickup Date & Drop date")
    }
    const rental = await Rental.findById(req.params.rid)
    const car = await Car.findById(rental.car)


    const newTotal = calculateDateDifference(pickupDate , dropDate) * car.rate                                               
    
    const updatedRental = await Rental.findByIdAndUpdate(req.params.rid , {pickupDate , dropDate , totalBill : newTotal} , { new: true })
    
   
    if(!updatedRental){
        res.status(400)
        throw new Error("Rental not updated")
    }
    res.status(200).json(updatedRental)

}
)

const deleteRental = expressAsyncHandler(async(req , res) => {

  const rental = await Rental.findById(req.params.rid)
  
  const car = await Car.findById(rental.car)
  console.log(car)
    
  const deletedRental = await Rental.findByIdAndDelete(req.params.rid)

  if(!deletedRental){
    res.status(400)
    throw new Error("Error in deleting rental")
  }

  const updateCar = await Car.findByIdAndUpdate(car._id , {isBooked : false} , {new : true})
  console.log(updateCar)

  res.status(200).json(
    {
        message : "Rental Deleted" , 
        id : req.params.rid ,
    }

)

}
)
module.exports = {getUserRentals , addUserRental , getUserRental , updateRental , deleteRental}