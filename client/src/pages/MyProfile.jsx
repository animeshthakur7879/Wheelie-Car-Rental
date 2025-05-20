import React, { useState } from 'react';
import { User, Mail, Phone, Edit, ArrowLeft, ArrowRight, Save, X, Shield, Calendar } from 'lucide-react';
import { useSelector } from 'react-redux';

const MyProfile = () => {
  const {user} = useSelector(state => state.auth)
  console.log(user)
  
  const [isLoading, setIsLoading] = useState(false);


  const handleUpdateSubmit = () => {
    // Just close the modal in this sample version
    setUpdateModalOpen(false);
    // In a real implementation, this would update the user data
    alert("Profile would be updated in a real implementation");
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
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
            My Profile
          </h1>
          <p className="text-gray-300 max-w-md text-center">
            Manage your personal information
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-30 mt-10">
        {/* Main content card */}
        <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800/50 rounded-xl shadow-xl shadow-black/20 overflow-hidden">
          {/* Content area */}
          <div className="p-5">
            {isLoading ? (
              // Loading state
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              // Profile information
              <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar section */}
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
                  <p className="text-gray-400 text-sm mb-4">Member since {formatDate(user.createdAt)}</p>
                
                </div>

                {/* Profile details */}
                <div className="md:w-2/3">
                  <div className="space-y-6">
                    {/* Personal information section */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-300 mb-4 pb-2 border-b border-gray-800">
                        Personal Information
                      </h3>
                      
                      <div className="space-y-4">
                        {/* Name */}
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                              <User className="h-5 w-5 text-blue-400" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Full Name</p>
                            <p className="text-white">{user.name}</p>
                          </div>
                        </div>
                        
                        {/* Email */}
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                              <Mail className="h-5 w-5 text-blue-400" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Email Address</p>
                            <p className="text-white">{user.email}</p>
                          </div>
                        </div>
                        
                        {/* Phone */}
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                              <Phone className="h-5 w-5 text-blue-400" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Phone Number</p>
                            <p className="text-white">{user.phone || 'Not provided'}</p>
                          </div>
                        </div>

                        {/* Account Status */}
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                              <Shield className="h-5 w-5 text-blue-400" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Account Status</p>
                            <div className="flex items-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-800/50">
                                Active
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Join Date */}
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                              <Calendar className="h-5 w-5 text-blue-400" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-400">Member Since</p>
                            <p className="text-white">{formatDate(user.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default MyProfile;