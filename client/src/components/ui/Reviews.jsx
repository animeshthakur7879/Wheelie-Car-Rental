import React from 'react'
import { Search, Calendar, MapPin, ChevronRight, Car, Shield, CreditCard, MessageSquare } from 'lucide-react';

const Reviews = () => {
  return (
    <div className="bg-gray-50 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">What Our Customers Say</h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Don't just take our word for it
        </p>
      </div>
      
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
        {[
          {
            quote: "Wheelie made our family vacation so much easier. The car was clean, comfortable, and the service was excellent.",
            author: "Sarah J.",
            location: "New York"
          },
          {
            quote: "I needed a luxury car for a business meeting, and Wheelie delivered. The booking process was smooth and the car was perfect.",
            author: "Michael T.",
            location: "Chicago"
          },
          {
            quote: "As a frequent traveler, I've used many car rental services. Wheelie stands out with their great selection and customer service.",
            author: "Lisa R.",
            location: "Los Angeles"
          }
        ].map((testimonial, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <div className="ml-2 text-sm text-gray-500">Verified Rental</div>
            </div>
            <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            <div className="mt-4">
              <p className="text-gray-900 font-medium">{testimonial.author}</p>
              <p className="text-gray-500 text-sm">{testimonial.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Reviews
