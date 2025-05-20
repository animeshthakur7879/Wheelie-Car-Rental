import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X, Car, AlertTriangle } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { addCar, getCars, removeCar, updateCar } from '../../features/car/carSlice';
import { toast } from 'react-toastify';

const CarManage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCarId, setCurrentCarId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    fuelType: 'petrol',
    category: 'sedan',
    company: '',
    rate: '',
    registration: '',
    carImage: ''
  });
  
  const { cars, car, isSuccess, isError, message } = useSelector(state => state.car);
  const dispatch = useDispatch();

  const openModal = (isEdit = false, carData = null) => {
    if (isEdit && carData) {
      setIsEditing(true);
      setCurrentCarId(carData._id);
      setFormData({
        name: carData.name,
        fuelType: carData.fuelType,
        category: carData.category,
        company: carData.company,
        rate: carData.rate,
        registration: carData.registration,
        carImage: carData.carImage || ''
      });
    } else {
      setIsEditing(false);
      setCurrentCarId(null);
      setFormData({
        name: '',
        fuelType: 'petrol',
        category: 'sedan',
        company: '',
        rate: '',
        registration: '',
        carImage: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentCarId(null);
    setFormData({
      name: '',
      fuelType: 'petrol',
      category: 'sedan',
      company: '',
      rate: '',
      registration: '',
      carImage: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      if (isEditing) {
        await dispatch(updateCar({ id: currentCarId, formData: formData }));
        toast.success("Car updated successfully");
      } else {
        await dispatch(addCar(formData));
        toast.success("Car added successfully");
      }
      
      // Fetch cars after operation
      await dispatch(getCars());
      closeModal();
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch of cars when component mounts
  useEffect(() => {
    const loadCars = async () => {
      setIsLoading(true);
      await dispatch(getCars());
      setIsLoading(false);
    };
    
    loadCars();
  }, [dispatch]);

  // Handle error messages
  useEffect(() => {
    if(isError && message){
      toast.error(message);
    }
  }, [isError, message]);

  // HANDLE DELETE CAR
  const confirmDelete = (id) => {
    setDeleteConfirmId(id);
  };
  
  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };
  
  const handleRemove = async(id) => {
    setIsLoading(true);
    try {
      await dispatch(removeCar(id));
      await dispatch(getCars());
      toast.success("Car removed successfully");
    } catch (error) {
      toast.error(error.message || "Failed to remove car");
    } finally {
      setIsLoading(false);
      setDeleteConfirmId(null);
    }
  };

  // Get current date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

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
              <h1 className="text-3xl font-bold text-white mb-2">Manage Cars</h1>
              <p className="text-gray-400">{formattedDate}</p>
            </div>
            <button 
              onClick={() => openModal()}
              className="mt-4 md:mt-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-1 flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Car
            </button>
          </div>
          
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Car</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Registration</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {cars.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                        <div className="flex flex-col items-center justify-center">
                          <Car className="h-12 w-12 mb-4 text-gray-500" />
                          <p className="text-lg font-medium">No cars available</p>
                          <p className="text-sm text-gray-500 mt-1">Add your first car to get started</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    cars.map((car) => (
                      <tr key={car._id} className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {car.carImage ? (
                            <img 
                              src={car.carImage} 
                              alt={car.name} 
                              className="h-16 w-24 object-cover rounded-md shadow-md border border-gray-600"
                            />
                          ) : (
                            <div className="h-16 w-24 bg-gray-700 rounded-md flex items-center justify-center">
                              <Car className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-white font-medium">{car.name}</p>
                            <p className="text-gray-400 text-sm">{car.company} • {car.category}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">{car.registration}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-blue-400 font-semibold">₹{car.rate}/day</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            !car.isBooked ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30'
                          }`}>
                            {car.isBooked ? "Booked" : "Available"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {deleteConfirmId === car._id ? (
                            <div className="flex space-x-2">
                              <button 
                                className="bg-red-600/20 text-red-400 px-2 py-1 rounded border border-red-500/30 hover:bg-red-600/30 transition-colors"
                                onClick={() => handleRemove(car._id)}
                              >
                                Confirm
                              </button>
                              <button 
                                className="bg-gray-700 text-gray-300 px-2 py-1 rounded border border-gray-600 hover:bg-gray-600 transition-colors"
                                onClick={cancelDelete}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex space-x-3">
                              <button 
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                onClick={() => openModal(true, car)}
                              >
                                <Edit className="h-5 w-5" />
                              </button>
                              <button 
                                className="text-red-400 hover:text-red-300 transition-colors"
                                onClick={() => confirmDelete(car._id)}
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          )}
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

      {/* Car Modal - Used for both Add and Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/60">
          <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl p-8 relative animate-fadeIn border border-gray-700">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-xl"></div>
            
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-1">
              {isEditing ? 'Update Car' : 'Add New Car'}
            </h2>
            <p className="text-gray-400 mb-6">
              {isEditing ? 'Edit the details of the car below' : 'Enter the details of the new car below'}
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Car Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                    placeholder="e.g. Toyota Corolla"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                    placeholder="e.g. Toyota"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Fuel Type</label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  >
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="cng">CNG</option>
                    <option value="ev">Electric Vehicle</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  >
                    <option value="hatchbag">Hatchback</option>
                    <option value="suv">SUV</option>
                    <option value="sedan">Sedan</option>
                    <option value="coupe">Coupe</option>
                    <option value="jeep">Jeep</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Rate ($/day)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-400">$</span>
                    </div>
                    <input
                      type="number"
                      name="rate"
                      value={formData.rate}
                      onChange={handleChange}
                      required
                      className="w-full pl-8 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                      placeholder="e.g. 50"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Registration Number</label>
                  <input
                    type="text"
                    name="registration"
                    value={formData.registration}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                    placeholder="e.g. ABC-123"
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
                  <input
                    type="text"
                    name="carImage"
                    value={formData.carImage}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                    placeholder="e.g. http://carImage_URL"
                  />
                </div>
              </div>
              
              <div className="pt-4 mt-6 border-t border-gray-700 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-gray-700 text-gray-300 font-medium rounded-lg border border-gray-600 hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-600 shadow-md hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    isEditing ? 'Update Car' : 'Add Car'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarManage;