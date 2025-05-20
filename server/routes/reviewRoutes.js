const express = require("express")
const { getCarReviews, addCarReview } = require("../controllers/reviewController")
const protect = require("../middleware/authMiddleware")

const router = express.Router({mergeParams : true})

router.get("/" , protect , getCarReviews)
router.post("/add" , protect , addCarReview)



module.exports = router