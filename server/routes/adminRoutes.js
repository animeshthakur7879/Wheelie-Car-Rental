const express = require("express")
const { addCar, updateCar, removeCar, getRentals, getAllUserReviews } = require("../controllers/adminController")
const adminProtect = require("../middleware/adminMiddleware")

const router = express.Router()

router.post("/car" , adminProtect ,  addCar) //done
router.put("/car/:cid" , adminProtect ,  updateCar) //done
router.delete("/car/:cid" , adminProtect ,  removeCar) //done
router.get("/rentals" , adminProtect ,  getRentals) //done
router.get("/reviews" , adminProtect,  getAllUserReviews)


module.exports = router