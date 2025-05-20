import React, { useContext, useEffect } from 'react';
import { Car, Search, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FilteredCarsContext } from '../../context/FilteredCarsContext';
import { toast } from 'react-toastify';
// import './index.css';

function Hero() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [carPosition, setCarPosition] = React.useState(0);
  const { filteredCars, setFilteredCars } = useContext(FilteredCarsContext);

  const navigate = useNavigate()
  const {cars} = useSelector(state => state.car)
 

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCarPosition(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const getFilteredCars = cars.filter(car => car.name.toLowerCase().includes(searchQuery.toLowerCase()));
   setFilteredCars(getFilteredCars)
   if(getFilteredCars.length > 0){
    navigate('/search/result')
   }else{
    toast.error("No car found")
   }

  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 overflow-hidden">
        {/* Animated light streaks */}
        <div className="absolute inset-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i}
              className="absolute h-1 bg-blue-400 opacity-20 blur-md"
              style={{
                width: `${150 + Math.random() * 250}px`,
                top: `${30 + i * 15}%`,
                left: `${-30}%`,
                animation: `moveRight ${6 + i}s infinite linear`,
                transform: 'skewX(-30deg)'
              }}
            ></div>
          ))}
        </div>
        
        {/* Subtle particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-300 opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                boxShadow: '0 0 8px 2px rgba(59, 130, 246, 0.2)',
                animation: `float ${3 + Math.random() * 4}s infinite alternate ease-in-out`
              }}
            ></div>
          ))}
        </div>
        
        {/* Road at the bottom */}
        <div className="absolute bottom-0 w-full h-24 bg-gray-900">
          {/* Road markings */}
          <div className="absolute top-1/2 w-full h-1 flex space-x-12">
            {Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={i} 
                className="h-1 w-12 bg-yellow-400 opacity-60"
                style={{
                  animation: `moveLeft 15s infinite linear ${i * 0.5}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Animated cars */}
        <div className="absolute bottom-16 left-0 w-full">
          {/* Fast car */}
          <div 
            className="absolute w-24 h-8"
            style={{
              left: `${(carPosition * 2) % 120 - 20}%`,
              filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))'
            }}
          >
            <div className="w-full h-full bg-blue-600 rounded-lg relative">
              <div className="absolute top-1 left-6 right-6 h-3 bg-blue-300 rounded"></div>
              <div className="absolute bottom-0 left-3 w-3 h-3 bg-gray-800 rounded-full"></div>
              <div className="absolute bottom-0 right-3 w-3 h-3 bg-gray-800 rounded-full"></div>
            </div>
          </div>

          {/* Slower car */}
          <div 
            className="absolute w-24 h-8"
            style={{
              right: `${(carPosition * 1.5) % 100}%`,
              filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))'
            }}
          >
            <div className="w-full h-full bg-indigo-500 rounded-lg relative">
              <div className="absolute top-1 left-6 right-6 h-3 bg-indigo-300 rounded"></div>
              <div className="absolute bottom-0 left-3 w-3 h-3 bg-gray-800 rounded-full"></div>
              <div className="absolute bottom-0 right-3 w-3 h-3 bg-gray-800 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8 flex flex-col h-full mt-28">
        {/* Logo and navbar */}

        {/* Hero content */}
        <div className="flex flex-col items-center text-center mt-16 md:mt-24">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6 relative">
            <span className="relative z-10">Find Your</span>
            <span className="relative mx-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Perfect</span>
              <span className="absolute -inset-1 blur-xl bg-blue-400 opacity-30 rounded-lg"></span>
            </span>
            <span className="relative z-10">Ride</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-300 mb-12">
            Experience luxury and comfort with our premium fleet of vehicles.
          </p>

          {/* Search bar */}
          <div className="w-full max-w-2xl">
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg transition-opacity duration-500 blur-md ${
                isSearchFocused ? 'opacity-30' : 'opacity-0'
              }`}></div>
              <div className="relative flex">
                
               <form onSubmit={(e) => handleSubmit(e)} className=' w-full md:flex'>
                  <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      className="block md:w-2/3 w-full pl-12 pr-4 py-4 bg-gray-900 bg-opacity-60 backdrop-blur-lg text-white placeholder-gray-400 border border-gray-800 md:rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Search for your dream car..."
                    />
                    <button className="px-8 py-3 md:py-0 mt-5 md:mt-0 md:w-1/3 w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium md:rounded-r-lg flex items-center justify-center hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 group">
                      <span className="flex items-center">
                        Search
                        <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
               </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }
        @keyframes moveRight {
          0% { transform: translateX(-100%) skewX(-30deg); }
          100% { transform: translateX(1000%) skewX(-30deg); }
        }
        @keyframes moveLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-1000%); }
        }
      `}</style>
    </div>
  );
}

export default Hero;