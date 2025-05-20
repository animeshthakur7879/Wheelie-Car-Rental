import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Tag, 
  Fuel, 
  ShieldCheck, 
  IndianRupee, 
  Star, 
  Users, 
  Briefcase, 
  CheckCircle, 
  ArrowLeft,
  AlarmClock,
  MessageSquare,
  X
} from 'lucide-react';
import { getCar } from '../features/car/carSlice';
import { addUserRental } from '../features/rental/rentalSlice';
import { toast } from 'react-toastify';
import { addUserReview, getCarReviews } from '../features/review/reviewSlice';

const CarBookingPage = () => {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Review Modal State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    dispatch(getCar(cid))
  } , [])

  useEffect(() => {
      dispatch(getCarReviews(cid))
    } , [])
  
  
  // Retrieve the specific car from the Redux store
  const { cars , car } = useSelector(state => state.car);  
  const {rental , isError , message} = useSelector(state => state.rental)
  const {reviews} = useSelector(state => state.review)


  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of year
    return `${day}-${month}-${year}`;
  }



  useEffect(() => {
    if(isError){
        toast.error(message || "Error Occurred try again later")
    }
  } , [isError , message])

  // Form state
  const [formData, setFormData] = useState({
    pickupDate: '',
    dropDate: ''
  });
  
  // Calculated total bill
  const [totalBill, setTotalBill] = useState(0);
  
  // Calculate total days and total bill
  useEffect(() => {
    if (formData.pickupDate && formData.dropDate) {
      const pickupDateTime = new Date(formData.pickupDate).getTime();
      const dropDateTime = new Date(formData.dropDate).getTime();
      
      // Calculate difference in days
      const diffTime = Math.abs(dropDateTime - pickupDateTime);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Ensure minimum 1 day
      const days = diffDays > 0 ? diffDays : 1;
      
      // Calculate total
      setTotalBill(days * car.rate);
    } else {
      setTotalBill(0);
    }
  }, [formData.pickupDate, formData.dropDate, car.rate]);

  
  
  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle booking submission
  const  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData)
     dispatch(addUserRental({cid , formData}))
     toast.success("Car Booked")
     navigate('/profile/rentals')
    
    // Here you would dispatch an action to book the car
    // dispatch(bookCar(car.id, formData));
        
    // Redirect to confirmation page or dashboard
    // navigate('/bookings');
  };

  // Handle review form changes
  const handleReviewChange = (e) => {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value
    });
  };

  // Handle star rating click
  const handleStarClick = (rating) => {
    setReviewData({
      ...reviewData,
      rating
    });
  };

  // Handle review submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();

    dispatch(addUserReview({cid , reviewData}))
    
    // Here you would dispatch an action to submit the review
    // For example: dispatch(addReview({ carId: cid, ...reviewData }));
    
    toast.success("Review submitted successfully!");
    setShowReviewModal(false);
    
    // Optionally refresh reviews
    dispatch(getCarReviews(cid));
  };
    
  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;
  
  // If car is not found
//   if (!car._id) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
//         <h2 className="text-2xl font-bold mb-4">Car not found</h2>
//         <button 
//           onClick={() => navigate('/cars')}
//           className="px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full font-medium"
//         >
//           Back to Cars
//         </button>
//       </div>
//     );
//   }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-15">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-blue-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Car Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Car Image and Basic Details */}
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
              <div className="relative h-80">
                <img 
                  src={car.carImage} 
                  alt={`${car.company} ${car.name}`} 
                  className="w-full h-full object-cover"
                />
                
                {/* Status Badge */}
                <div className={`
                  absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium
                  flex items-center
                  ${!car.isBooked 
                    ? 'bg-green-900/80 text-green-300 border border-green-700/50' 
                    : 'bg-red-900/80 text-red-300 border border-red-700/50'}
                `}>
                  {!car.isBooked 
                    ? <><ShieldCheck className="w-3 h-3 mr-1" /> Available</> 
                    : <><ShieldCheck className="w-3 h-3 mr-1" /> Booked</>}
                </div>
                
                {/* Registration Badge */}
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-gray-900/80 text-gray-300 backdrop-blur-sm border border-gray-700/50">
                  # {car.registration}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white">
                      {car.company} {car.name}
                    </h1>
                    <div className="flex items-center mt-2">
                      <Tag className="w-4 h-4 text-blue-400 mr-1" />
                      <span className="text-gray-400">{car.category}</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <IndianRupee className="w-4 h-4 text-blue-400 mr-1 mt-1" />
                    <div>
                      <span className="text-2xl font-bold text-white">{car.rate}</span>
                      <span className="text-gray-400 text-sm">/day</span>
                    </div>
                  </div>
                </div>
                
                {/* Rating Display */}
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                    />
                  ))}
                  <span className="ml-2 text-yellow-400 font-medium">{averageRating.toFixed(1)}</span>
                  <span className="text-gray-400 ml-1">({reviews.length} reviews)</span>
                </div>
                
                {/* Car Specifications */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-900 rounded-lg mb-4">
                  <div className="flex flex-col items-center">
                    <Fuel className="w-5 h-5 text-blue-400 mb-2" />
                    <p className="text-sm text-gray-400">Fuel Type</p>
                    <p className="font-medium">{car.fuelType || "Petrol"}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Users className="w-5 h-5 text-blue-400 mb-2" />
                    <p className="text-sm text-gray-400">Capacity</p>
                    <p className="font-medium">{car.capacity || "5 Persons"}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Briefcase className="w-5 h-5 text-blue-400 mb-2" />
                    <p className="text-sm text-gray-400">Luggage</p>
                    <p className="font-medium">{car.luggage || "3 Bags"}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <AlarmClock className="w-5 h-5 text-blue-400 mb-2" />
                    <p className="text-sm text-gray-400">Year</p>
                    <p className="font-medium">{car.year || "2023"}</p>
                  </div>
                </div>
                
                {/* Car Features List */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Air Conditioning', 'Bluetooth', 'GPS Navigation', 'USB Charger', 'Audio Input', 'Cruise Control'].map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-400 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Reviews Section */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Customer Reviews</h2>
                
                {/* Add Review Button */}
                <button 
                  onClick={() => setShowReviewModal(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Add Review
                </button>
              </div>
              
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="border-b border-gray-700 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium">{review.user.name}</p>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-400">{formatDate(review.createdAt)}</p>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No reviews yet.</p>
              )}
            </div>
          </div>
          
          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            {
                !car.isBooked ? <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 sticky top-6">
                <h2 className="text-2xl font-bold mb-6">Book This Car</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-4 h-4 text-blue-400 mr-2" />
                      <label className="font-medium">Pickup Date</label>
                    </div>
                    <input
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-4 h-4 text-blue-400 mr-2" />
                      <label className="font-medium">Drop-off Date</label>
                    </div>
                    <input
                      type="date"
                      name="dropDate"
                      value={formData.dropDate}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      min={formData.pickupDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  {/* Cost Breakdown */}
                  {totalBill > 0 && (
                    <div className="bg-gray-900 rounded-lg p-4 mb-6">
                      <h3 className="text-lg font-medium mb-3">Price Details</h3>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Rate per day</span>
                        <div className="flex items-center">
                          <IndianRupee className="w-3 h-3 text-gray-400 mr-1" />
                          <span>{car.rate}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">
                          Days
                        </span>
                        <span>
                          {Math.ceil(
                            (new Date(formData.dropDate) - new Date(formData.pickupDate)) / 
                            (1000 * 60 * 60 * 24)
                          ) || 1}
                        </span>
                      </div>
                      
                      <div className="h-px bg-gray-700 my-3"></div>
                      
                      <div className="flex justify-between font-bold">
                        <span>Total Amount</span>
                        <div className="flex items-center">
                          <IndianRupee className="w-4 h-4 text-blue-400 mr-1" />
                          <span>{totalBill}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <button 
                    type="submit"
                    disabled={car.isBooked}
                    className={`
                      w-full py-3 px-4 rounded-md text-sm font-medium
                      ${!car.isBooked 
                        ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white hover:shadow-md hover:shadow-blue-700/20' 
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
                    `}
                  >
                    {!car.isBooked ? 'Confirm Booking' : 'Currently Unavailable'}
                  </button>
                </form>
                
                {/* Cancellation Policy */}
                <div className="mt-6 text-sm text-gray-400">
                  <p className="font-medium text-blue-400 mb-2">Cancellation Policy:</p>
                  <p>Free cancellation up to 24 hours before pickup. After that, a fee of 50% of the total booking amount applies.</p>
                </div>
              </div> : <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 sticky top-6 text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-100">Car is Booked</h2>
      <p className="text-gray-400 mb-6">
        This car has already been reserved and is currently unavailable for booking.
      </p>
      <div className="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 0a8 8 0 11-16 0 8 8 0 0116 0z" />
        </svg>
      </div>
      <p className="text-sm text-gray-500 mt-4">Please check other available cars.</p>
    </div>
            }
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-md p-6 relative animate-fadeIn">
            {/* Close Button */}
            <button 
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-2xl font-bold mb-6">Write a Review</h2>
            
            <form onSubmit={handleReviewSubmit}>
              {/* Rating Stars */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Your Rating
                </label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star 
                        className={`w-8 h-8 transition-colors ${
                          star <= reviewData.rating 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-600 hover:text-gray-500'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Comment */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Your Review
                </label>
                <textarea
                  name="comment"
                  value={reviewData.comment}
                  onChange={handleReviewChange}
                  required
                  placeholder="Share your experience with this car..."
                  rows="4"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                ></textarea>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-md text-sm font-medium hover:shadow-md hover:shadow-blue-700/20 transition-all"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarBookingPage;