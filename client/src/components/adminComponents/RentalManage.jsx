import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminRentals } from '../../features/rental/rentalSlice';
import { Calendar, User, Car, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const RentalManage = () => {
  const { rentals } = useSelector(state => state.rental);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchRentals = async () => {
      setIsLoading(true);
      await dispatch(getAdminRentals());
      setIsLoading(false);
    };
    fetchRentals();
  }, [dispatch]);

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

  // Filter rentals (basic: all rentals for now)
  const filteredRentals = rentals.filter((rental) => {
    if (activeFilter === 'all') return true;
    return rental.status === activeFilter;
  });

  // Status Badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="flex items-center text-blue-400 font-medium">
            <Clock className="h-4 w-4 mr-1" /> Active
          </span>
        );
      case 'completed':
        return (
          <span className="flex items-center text-emerald-400 font-medium">
            <CheckCircle className="h-4 w-4 mr-1" /> Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="flex items-center text-red-400 font-medium">
            <AlertCircle className="h-4 w-4 mr-1" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="flex items-center text-gray-400 font-medium">
            <AlertCircle className="h-4 w-4 mr-1" /> Unknown
          </span>
        );
    }
  };

  // Count stats
  const totalRentals = rentals.length;
  const activeRentals = rentals.filter(r => r.status === 'active').length;
  const completedRentals = rentals.filter(r => r.status === 'completed').length;

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
              <h1 className="text-3xl font-bold text-white mb-2">Rental Management</h1>
              <p className="text-gray-400">{formattedDate}</p>
            </div>
          </div>

          

          {/* Rental Table */}
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Rental History</h2>
              <p className="text-gray-400 text-sm">Showing {filteredRentals.length} rentals</p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Car</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Registration</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Pick-up</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Drop-off</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {filteredRentals.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-12 text-center text-gray-400">
                        <div className="flex flex-col items-center justify-center">
                          <Calendar className="h-12 w-12 mb-4 text-gray-500" />
                          <p className="text-lg font-medium">No rentals found</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {activeFilter !== 'all' ? `Try changing the filter or check back later` : `There are no rentals in the system yet`}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredRentals.map((rental, index) => (
                      <tr key={index} className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 mr-3">
                              <User className="h-4 w-4" />
                            </div>
                            <span className="text-gray-300">{rental.user?.name || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">{rental.user?.email || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 mr-3">
                              <Car className="h-4 w-4" />
                            </div>
                            <span className="text-gray-300">{rental.car?.name || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">{rental.car?.registration || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-blue-400">{formatDate(rental?.pickupDate)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-purple-400">{formatDate(rental?.dropDate)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-medium text-emerald-400">₹{rental?.totalBill || rental?.totalAmount || 0}</span>
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

export default RentalManage;
