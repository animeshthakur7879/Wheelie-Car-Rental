import React from 'react';
import { Search, Calendar, MapPin, ChevronRight, Car, Shield, CreditCard, MessageSquare } from 'lucide-react';

const FeaturedDeals = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50 rounded-xl shadow-sm">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Featured Deals</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Limited time offers on our most popular vehicles
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            model: 'Tesla Model 3',
            type: 'Electric Sedan',
            price: '$79/day',
            discount: 'Save 15%',
            image: '/api/placeholder/400/260',
            features: ['Autopilot', '300+ mile range', 'Free supercharging']
          },
          {
            model: 'Jeep Wrangler',
            type: 'SUV',
            price: '$65/day',
            discount: 'Save 10%',
            image: '/api/placeholder/400/260',
            features: ['4x4 capability', 'Removable top', 'Adventure ready']
          },
          {
            model: 'BMW 5 Series',
            type: 'Luxury Sedan',
            price: '$95/day',
            discount: 'Save 20%',
            image: '/api/placeholder/400/260',
            features: ['Premium interior', 'Performance engine', 'Advanced tech']
          }
        ].map((car, idx) => (
          <div 
            key={idx} 
            className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="relative">
              <img 
                src={car.image} 
                alt={car.model}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 bg-red-500 text-white py-1 px-3 rounded-full text-sm font-medium">
                {car.discount}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {car.model}
              </h3>
              <div className="flex items-center text-gray-600 text-sm mb-4">
                <Car size={16} className="mr-1" />
                {car.type}
              </div>
              
              <div className="border-t border-gray-100 my-4 pt-4">
                <ul className="space-y-2">
                  {car.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center text-sm text-gray-600">
                      <div className="mr-2 text-green-500">✓</div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <div className="text-2xl font-bold text-gray-800">
                  {car.price}
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300">
                  Book Now
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
        <div className="flex items-center">
          <Shield className="text-blue-600 mr-2" size={20} />
          <span>Insurance included</span>
        </div>
        <div className="flex items-center">
          <CreditCard className="text-blue-600 mr-2" size={20} />
          <span>No hidden fees</span>
        </div>
        <div className="flex items-center">
          <MessageSquare className="text-blue-600 mr-2" size={20} />
          <span>24/7 customer support</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedDeals;