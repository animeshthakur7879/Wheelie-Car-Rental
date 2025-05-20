import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminReviews } from '../../features/review/reviewSlice';
import { toast } from 'react-toastify';
import { Calendar, User, Car, Star, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const ReviewManage = () => {
  const dispatch = useDispatch();
  const { reviews, isLoading, isError, message } = useSelector(state => state.review);
  const [activeFilter, setActiveFilter] = useState('all');
  
  useEffect(() => {
    dispatch(getAdminReviews());
  }, [dispatch]);
  
  useEffect(() => {
    if(isError){
      toast.error(message);
    }
  }, [isError, message]);

  // Format date for better display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get current date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Filter reviews based on rating
  const filteredReviews = reviews ? reviews.filter((review) => {
    if (activeFilter === 'all') return true;
    return review.rating === parseInt(activeFilter);
  }) : [];

  // Count stats
  const totalReviews = reviews ? reviews.length : 0;
  const averageRating = reviews && reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) 
    : 0;
  const fiveStarReviews = reviews ? reviews.filter(r => r.rating === 5).length : 0;

  // Rating Stars Component
  const RatingStars = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900/95 p-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Review Management</h1>
              <p className="text-gray-400">{formattedDate}</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 mr-4">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Reviews</p>
                  <h3 className="text-2xl font-bold text-white">{totalReviews}</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-yellow-600/20 flex items-center justify-center text-yellow-400 mr-4">
                  <Star className="h-6 w-6 fill-yellow-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Average Rating</p>
                  <h3 className="text-2xl font-bold text-white">{averageRating}/5</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-green-600/20 flex items-center justify-center text-green-400 mr-4">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">5-Star Reviews</p>
                  <h3 className="text-2xl font-bold text-white">{fiveStarReviews}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              onClick={() => setActiveFilter('all')}
            >
              All Reviews
            </button>
            {[5, 4, 3, 2, 1].map(rating => (
              <button
                key={rating}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === rating.toString() ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                onClick={() => setActiveFilter(rating.toString())}
              >
                {rating} Star
              </button>
            ))}
          </div>

          {/* Reviews Table */}
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">User Reviews</h2>
              <p className="text-gray-400 text-sm">Showing {filteredReviews.length} reviews</p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Car</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Registration</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Comment</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {filteredReviews.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-400">
                        <div className="flex flex-col items-center justify-center">
                          <Star className="h-12 w-12 mb-4 text-gray-500" />
                          <p className="text-lg font-medium">No reviews found</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {activeFilter !== 'all' ? `Try changing the filter or check back later` : `There are no reviews in the system yet`}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredReviews.map((review, index) => (
                      <tr key={index} className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 mr-3">
                              <User className="h-4 w-4" />
                            </div>
                            <span className="text-gray-300">{review.user?.name || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">{review.user?.email || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 mr-3">
                              <Car className="h-4 w-4" />
                            </div>
                            <span className="text-gray-300">{review.car?.name || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">{review.car?.registration || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <RatingStars rating={review.rating} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-blue-400">{formatDate(review.createdAt)}</td>
                        <td className="px-6 py-4 max-w-xs">
                          <p className="text-gray-300 truncate">{review.comment}</p>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewManage;