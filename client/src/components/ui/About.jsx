import React from 'react'
import { Search, Calendar, MapPin, ChevronRight, Car, Shield, CreditCard, MessageSquare } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-gray-100 py-10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="hidden lg:block absolute -right-16 -bottom-16 w-64 h-64 bg-blue-100 rounded-full opacity-30"></div>
      <div className="hidden lg:block absolute -left-16 -top-16 w-48 h-48 bg-blue-200 rounded-full opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="relative inline-block">
              How Wheelie Works
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform origin-left"></span>
            </span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Renting a car has never been easier
          </p>
        </div>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-blue-200">
            <div className="absolute left-1/6 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
            <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
            <div className="absolute left-5/6 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-blue-500">
              <div className="flex justify-center mb-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
                  <Search className="h-7 w-7" />
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
                  Step 1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Search</h3>
                <p className="text-base text-gray-600">
                  Find the perfect vehicle for your needs using our simple search tool. Filter by type, features, and price.
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-center text-gray-500 text-sm">
                  <span className="flex items-center mr-4">
                    <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Simple filters
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Real-time availability
                  </span>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-blue-500">
              <div className="flex justify-center mb-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
                  <CreditCard className="h-7 w-7" />
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
                  Step 2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Book & Pay</h3>
                <p className="text-base text-gray-600">
                  Secure your reservation with our simple booking system. Multiple payment options available for your convenience.
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-center text-gray-500 text-sm">
                  <span className="flex items-center mr-4">
                    <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Secure payment
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Instant confirmation
                  </span>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-blue-500">
              <div className="flex justify-center mb-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
                  <Car className="h-7 w-7" />
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
                  Step 3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Enjoy the Ride</h3>
                <p className="text-base text-gray-600">
                  Pick up your car and enjoy the freedom of the open road. 24/7 customer support for your peace of mind.
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-center text-gray-500 text-sm">
                  <span className="flex items-center mr-4">
                    <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Quick pickup
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    24/7 support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
       
      </div>
    </div>
  )
}

export default About