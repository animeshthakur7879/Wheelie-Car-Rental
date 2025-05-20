import React from 'react'
import { ChevronRight, Star, Zap, Shield, TrendingUp } from 'lucide-react';

const PopularCars = () => {
  const categories = [
    {
      name: 'Economy',
      image: '/api/placeholder/300/200',
      price: 'From $35/day',
      features: ['Fuel Efficient', 'Compact', 'Easy Parking'],
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      name: 'SUVs',
      image: '/api/placeholder/300/200',
      price: 'From $55/day',
      features: ['Spacious', '4x4 Available', 'Family Friendly'],
      icon: <Shield className="w-5 h-5" />
    },
    {
      name: 'Luxury',
      image: '/api/placeholder/300/200',
      price: 'From $95/day',
      features: ['Premium Comfort', 'Advanced Features', 'Status Symbol'],
      icon: <Star className="w-5 h-5" />
    },
    {
      name: 'Electric',
      image: '/api/placeholder/300/200',
      price: 'From $60/day',
      features: ['Zero Emissions', 'Modern Tech', 'Cost Effective'],
      icon: <Zap className="w-5 h-5" />
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            <span className="inline-block pb-2 relative">
              Popular Car Categories
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full"></span>
            </span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Choose from our wide selection of vehicles to match your needs
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, idx) => (
            <div key={idx} className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
              <div className="relative h-64 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-blue-500 text-white p-2 rounded-lg shadow-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-1">
                  {category.icon}
                  <span className="font-medium">{category.name}</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    <a href="#" className="focus:outline-none">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      {category.name}
                    </a>
                  </h3>
                  <p className="font-medium text-blue-600">{category.price}</p>
                </div>
                
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <ul className="text-sm text-gray-500 space-y-2">
                    {category.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <a href="#" className="flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-800">
                    View details <ChevronRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href="#" className="group inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:shadow-lg">
            Explore All Categories 
            <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default PopularCars