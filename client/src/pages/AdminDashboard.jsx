import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AdminHome from '../components/adminComponents/AdminHome';
import CarManage from '../components/adminComponents/CarManage';
import RentalManage from '../components/adminComponents/RentalManage';
import ReviewManage from '../components/adminComponents/ReviewManage';
import AdminSideBar from '../components/adminComponents/adminSideBar';
import { Menu, X } from 'lucide-react'; // Import icons for menu toggle

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  
  // Handle responsive layout based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location, isMobile]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Mobile Menu Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Sidebar - Responsive */}
      <div 
        className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          ${isMobile ? 'fixed' : 'relative'}
          w-64 h-full z-40 transition-transform duration-300 ease-in-out md:translate-x-0
        `}
      >
        <AdminSideBar onNavigate={() => isMobile && setSidebarOpen(false)} />
      </div>
      
      {/* Semi-transparent overlay when sidebar is open on mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-30 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}
      
      {/* Main Content - Changes based on route */}
      <div className="flex-1 overflow-auto p-4 md:p-8 bg-gray-900">
        {/* Background gradient effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-blue-800/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Add padding for mobile to avoid content being hidden behind the menu button */}
        <div className={`relative z-10 ${isMobile ? 'pt-12' : ''}`}>
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/car" element={<CarManage />} />
            <Route path="/rentals" element={<RentalManage />} />
            <Route path="/reviews" element={<ReviewManage />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;