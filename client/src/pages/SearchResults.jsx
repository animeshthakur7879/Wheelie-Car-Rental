import React, { useContext, useState } from 'react';
import { Tag, Info, DollarSign, Calendar, ShieldCheck, AlertTriangle, IndianRupee, X, ArrowLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FilteredCarsContext } from '../context/FilteredCarsContext';

const CarsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCars, setVisibleCars] = useState(8); // Start with 8 cars
  
  const { filteredCars } = useContext(FilteredCarsContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
    
  // Get only the visible cars to display
  const visibleCarsList = filteredCars.slice(0, visibleCars);

  // Show more cars handler
  const handleShowMore = () => {
    setVisibleCars(prevVisible => prevVisible + 8); // Add 8 more cars
  };

  // Reset visible cars when category changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleCars(8); // Reset to initial 8 cars when changing category
  };

  // Go back to previous page
  const handleGoBack = () => {
    navigate(-1); // Navigate to previous page in history
  };

  return (
    <div className="py-16 bg-gray-900 min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Back Button */}
        <button 
          onClick={handleGoBack}
          className="flex items-center text-gray-400 hover:text-blue-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>
        
        {/* Gradient Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700">
              Available Cars
            </span>
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Here is your search result
          </p>
          <div className="h-1 w-24 mx-auto mt-4 bg-gradient-to-r from-blue-400 to-blue-700 rounded-full"></div>
        </div>
        
        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 md:gap-8">
          {filteredCars.slice(0, visibleCars).map((car) => (
            <CarCard 
              key={car.id} 
              car={car} 
            />
          ))}
        </div>

        {/* Show More Button */}
        {visibleCars < filteredCars.length && (
          <div className="mt-12 text-center">
            <button 
              onClick={handleShowMore}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-blue-700/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Load More Cars
            </button>
          </div>
        )}

        {/* No Results Message */}
        {filteredCars.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/20 mb-6">
              <X className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Cars Found</h3>
            <p className="text-gray-400">Try adjusting your search filters or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CarCard = ({ car }) => {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleClick = (cid) => {
    if(user){
      navigate(`/car/${cid}`);
    }
    else{
      navigate('/login');
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-700 hover:border-blue-700/50 transition-all duration-300 group hover:shadow-xl hover:shadow-blue-900/10 transform hover:-translate-y-1">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl"></div>
      </div>
      {/* Car Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={car.carImage} 
          alt={`${car.company} ${car.name}`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Status Badge */}
        <div className={`
          absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium
          flex items-center
          ${!car.isBooked 
            ? 'bg-green-900/80 text-green-300 border border-green-700/50' 
            : 'bg-red-900/80 text-red-300 border border-red-700/50'}
        `}>
          {!car.isBooked 
            ? <><ShieldCheck className="w-3 h-3 mr-1" /> Available</> 
            : <><AlertTriangle className="w-3 h-3 mr-1" /> Booked</>}
        </div>
        
        {/* Registration Badge */}
        <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-gray-900/80 text-gray-300 backdrop-blur-sm border border-gray-700/50">
          # {car.registration}
        </div>
      </div>
      
      {/* Car Details */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
              {car.company} {car.name}
            </h3>
            <div className="flex items-center mt-1">
              <Tag className="w-4 h-4 text-gray-400 mr-1" />
              <span className="text-sm text-gray-400">{car.category}</span>
            </div>
          </div>
          <div className="flex items-start">
            <IndianRupee className="w-4 h-4 text-blue-400 mr-1 mt-1" />
            <div>
              <span className="text-xl font-bold text-white">{car.rate}</span>
              <span className="text-gray-400 text-sm">/day</span>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-4"></div>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={() => handleClick(car._id)}
            className={`
              flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300
              ${!car.isBooked 
                ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white hover:shadow-md hover:shadow-blue-700/20 transform hover:-translate-y-0.5' 
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
            `}
            disabled={car.isBooked}
          >
            {!car.isBooked ? 'Book Now' : 'Unavailable'}
          </button>
          <button
            onClick={() => handleClick(car._id)}
            className="
              flex-1 py-2 px-4 rounded-md text-sm font-medium
              border border-gray-600 text-gray-300
              hover:bg-gray-700 hover:text-blue-400 hover:border-blue-700/50
              transition-all duration-300 
              flex items-center justify-center
            "
          >
            <Info className="w-4 h-4 mr-2" /> Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarsSection;