import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, Filter, ChevronDown, ArrowLeft, ArrowRight, Edit, X } from 'lucide-react';
import { getUserRentals, removeRental, updateUserRental } from '../features/rental/rentalSlice';
import { getCarReviews } from '../features/review/reviewSlice';

const MyRentals = () => {
  const { user } = useSelector(state => state.auth);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('date-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);
  const [formData, setFormData] = useState({
    pickupDate: '',
    dropDate: ''
  });
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);
  const { rentals, isLoading, isError, message } = useSelector(state => state.rental);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRentals());
  }, [dispatch]);
  
  // Listen for changes in the rental state
  useEffect(() => {
    // Set loading to false when rentals are loaded
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading, rentals]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Sort rentals based on selected option
  const sortedRentals = [...rentals].sort((a, b) => {
    switch (sortBy) {
      case 'date-asc':
        return new Date(a.pickupDate) - new Date(b.pickupDate);
      case 'date-desc':
        return new Date(b.pickupDate) - new Date(a.pickupDate);
      case 'price-asc':
        return a.amount - b.amount;
      case 'price-desc':
        return b.amount - a.amount;
      default:
        return 0;
    }
  });

  const handleUpdateClick = (rental) => {
    setSelectedRental(rental);
    setFormData({
      pickupDate: formatDateForInput(rental.pickupDate),
      dropDate: formatDateForInput(rental.dropDate)
    });
    setUpdateModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCancelClick = (rental) => {
    setSelectedRental(rental);
    setCancelConfirmOpen(true);
  };

  const handleUpdateSubmit = async () => {
    // Dispatch the action to update the rental dates
    await dispatch(updateUserRental({rid : selectedRental._id, formData}));
    setUpdateModalOpen(false);
    
    // Refresh the rentals list after update
    dispatch(getUserRentals());
  };

  const handleCancelRental = async () => {
    // Dispatch the action to cancel/remove the rental
    await dispatch(removeRental(selectedRental._id));
    setCancelConfirmOpen(false);
    
    // Refresh the rentals list after cancellation
    dispatch(getUserRentals());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-200 pb-16">
      {/* Page header with parallax effect */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/api/placeholder/1600/400)',
            transform: 'translateY(-20px) scale(1.1)',
            filter: 'brightness(0.4) blur(2px)'
          }}
        ></div>
        <div className="relative z-20 h-full flex flex-col justify-center items-center mt-10">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-2">
            My Rentals
          </h1>
          <p className="text-gray-300 max-w-md text-center">
            View all your vehicle rental history
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-30 mt-10">
        {/* Main content card */}
        <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800/50 rounded-xl shadow-xl shadow-black/20 overflow-hidden">
          {/* Filter and sort controls */}
          <div className="p-4 bg-gray-950/30 border-b border-gray-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
            <div className="text-sm text-gray-400">
              Showing <span className="text-white">{sortedRentals?.length}</span> rentals
            </div>

            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center px-3 py-2 text-sm bg-gray-800/50 hover:bg-gray-800 
                  rounded-lg border border-gray-700/50 transition-colors"
              >
                <Filter className="h-4 w-4 mr-2" />
                Sort by
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 border border-gray-800/50 z-40">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      onClick={() => { setSortBy('date-desc'); setIsFilterOpen(false); }}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        sortBy === 'date-desc' ? 'text-blue-400 bg-gray-800/50' : 'text-gray-300 hover:bg-gray-800/30'
                      }`}
                    >
                      Newest first
                    </button>
                    <button
                      onClick={() => { setSortBy('date-asc'); setIsFilterOpen(false); }}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        sortBy === 'date-asc' ? 'text-blue-400 bg-gray-800/50' : 'text-gray-300 hover:bg-gray-800/30'
                      }`}
                    >
                      Oldest first
                    </button>
                    <button
                      onClick={() => { setSortBy('price-desc'); setIsFilterOpen(false); }}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        sortBy === 'price-desc' ? 'text-blue-400 bg-gray-800/50' : 'text-gray-300 hover:bg-gray-800/30'
                      }`}
                    >
                      Price: High to low
                    </button>
                    <button
                      onClick={() => { setSortBy('price-asc'); setIsFilterOpen(false); }}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        sortBy === 'price-asc' ? 'text-blue-400 bg-gray-800/50' : 'text-gray-300 hover:bg-gray-800/30'
                      }`}
                    >
                      Price: Low to high
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content area */}
          <div className="p-5">
            {isLoading ? (
              // Loading state
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : sortedRentals.length === 0 ? (
              // Empty state
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/20 mb-4">
                  <Calendar className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-300 mb-2">No rentals found</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  You don't have any rental history at the moment.
                </p>
              </div>
            ) : (
              // Rental cards
              <div className="space-y-6">
                {sortedRentals?.map((rental) => (
                  <div
                    key={rental?._id}
                    className="bg-gray-900/50 border border-gray-800/50 rounded-xl overflow-hidden 
                      hover:shadow-lg hover:shadow-blue-900/5 transition-all transform hover:-translate-y-1 
                      hover:border-gray-700/50"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Car image */}
                      <div className="sm:w-1/3 md:w-1/4 h-48 sm:h-auto relative">
                        <img
                          src={rental.car.carImage}
                          alt={rental.car.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          {/* Status badge would go here */}
                        </div>
                      </div>

                      {/* Rental details */}
                      <div className="p-5 sm:w-2/3 md:w-3/4">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">{rental?.car.name}</h3>
                            <p className="text-sm text-gray-400">
                              Registration: <span className="text-gray-300 font-medium">{rental?.car.registration}</span>
                            </p>
                          </div>
                          <div className="text-xl font-bold text-right bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                            ₹{rental?.totalBill}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          {/* Pickup date */}
                          <div className="space-y-1">
                            <div className="text-sm font-medium text-gray-400">Pick-up Date</div>
                            <div className="text-white">{formatDate(rental?.pickupDate)}</div>
                          </div>

                          {/* Dropoff date */}
                          <div className="space-y-1">
                            <div className="text-sm font-medium text-gray-400">Drop-off Date</div>
                            <div className="text-white">{formatDate(rental?.dropDate)}</div>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-3 mt-4">
                          <button
                            onClick={() => handleUpdateClick(rental)}
                            className="flex items-center px-4 py-2 text-sm font-medium text-blue-400 bg-blue-900/20 
                              hover:bg-blue-900/30 rounded-lg border border-blue-800/50 transition-colors"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Update Rental
                          </button>
                          <button
                            onClick={() => handleCancelClick(rental)}
                            className="flex items-center px-4 py-2 text-sm font-medium text-red-400 bg-red-900/20 
                              hover:bg-red-900/30 rounded-lg border border-red-800/50 transition-colors"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel Rental
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {sortedRentals.length > 0 && (
            <div className="p-4 border-t border-gray-800/50 flex justify-between items-center">
              <button
                className="flex items-center px-3 py-2 text-sm text-gray-400 hover:text-blue-400 
                  disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Previous
              </button>
              <span className="text-sm text-gray-400">
                Page <span className="text-white font-medium">{currentPage}</span> of <span className="text-white font-medium">1</span>
              </span>
              <button
                className="flex items-center px-3 py-2 text-sm text-gray-400 hover:text-blue-400 
                  disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={true} // Disabled when on last page
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Update Rental Modal */}
      {updateModalOpen && selectedRental && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-4">Update Rental Dates</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Pick-up Date</label>
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Drop-off Date</label>
                <input
                  type="date"
                  name="dropDate"
                  value={formData.dropDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min={formData.pickupDate} // Ensure drop date is after pickup date
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setUpdateModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Update Dates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelConfirmOpen && selectedRental && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-2">Cancel Rental</h3>
            <p className="text-gray-300 mb-4">Are you sure you want to cancel your rental for {selectedRental.car.name}?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setCancelConfirmOpen(false)}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                No, Keep It
              </button>
              <button
                onClick={handleCancelRental}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Yes, Cancel Rental
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRentals;