import React, { useEffect, useState } from 'react'
import { Car, ClipboardList, MessageSquare, TrendingUp, Users, Calendar } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { getCars } from '../../features/car/carSlice'
import { getAdminReviews } from '../../features/review/reviewSlice'
import { getAdminRentals } from '../../features/rental/rentalSlice'

const AdminHome = () => {
  const { cars } = useSelector(state => state.car)
  const { rentals } = useSelector(state => state.rental)
  const { reviews } = useSelector(state => state.review)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await Promise.all([
        dispatch(getCars()),
        dispatch(getAdminRentals()),
        dispatch(getAdminReviews())
      ])
      setIsLoading(false)
    }
    
    fetchData()
  }, [dispatch])

  // Calculate quick stats
  const activeRentals = rentals.filter(rental => rental.status === 'active').length
  const completedRentals = rentals.filter(rental => rental.status === 'completed').length
  const totalRevenue = rentals.reduce((sum, rental) => sum + (rental.totalAmount || 0), 0)
  const highRatedCars = cars.filter(car => car.rating >= 4.5).length

  // Get current date
  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-gray-900/95 p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl"></div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
              <p className="text-gray-400">{formattedDate}</p>
            </div>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-3 shadow-lg">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-300">Total Cars</h2>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">{cars.length}</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-400">
                <span className="text-green-400 font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {highRatedCars} highly rated cars
                </span>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-3 shadow-lg">
                  <ClipboardList className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-300">Active Rentals</h2>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">{rentals.length}</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-400">
                <span className="text-blue-400 font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {completedRentals} completed rentals
                </span>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg p-3 shadow-lg">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-300">Reviews</h2>
                  <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">{reviews.length}</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-400">
                <span className="text-yellow-400 font-medium flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  Customer feedback
                </span>
              </div>
            </div>
          </div>

          
        </div>
      )}
    </div>
  )
}

export default AdminHome