import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Car, 
  ClipboardList, 
  MessageSquare,
  LayoutDashboard,
  LogOut
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';

const AdminSideBar = ({ onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()
  // Function to handle navigation with the onNavigate callback
  const handleNavigation = (path) => {
    navigate(path);
    if (onNavigate) onNavigate();
  };

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/')
  }
  
  // Check if a path is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-gray-900 shadow-lg border-r border-gray-800/50 h-full flex flex-col">
      <div className="p-4">
        <div className="flex items-center group">
          <div className="bg-blue-900/30 rounded-full p-2 mr-2 transition-all duration-300 group-hover:rotate-12 group-hover:shadow-md group-hover:shadow-blue-500/20">
            <Car className="h-6 w-6 text-blue-400 transform transition-transform duration-500 ease-in-out group-hover:text-blue-300" />
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Wheelie
            </span>
            <span className="block text-xs text-gray-400 -mt-1">Admin Dashboard</span>
          </div>
        </div>
      </div>
      
      <nav className="mt-6 flex-1 overflow-y-auto">
        <ul className="px-4 space-y-1">
          <li>
            <button
              onClick={() => handleNavigation('/admin')}
              className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
                isActive('/admin')
                  ? 'bg-blue-600/30 text-blue-400'
                  : 'text-gray-300 hover:bg-gray-800/70 hover:text-blue-400'
              }`}
            >
              <LayoutDashboard className="h-5 w-5 mr-3" />
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/admin/car')}
              className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
                isActive('/admin/car')
                  ? 'bg-blue-600/30 text-blue-400'
                  : 'text-gray-300 hover:bg-gray-800/70 hover:text-blue-400'
              }`}
            >
              <Car className="h-5 w-5 mr-3" />
              Manage Cars
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/admin/rentals')}
              className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
                isActive('/admin/rentals')
                  ? 'bg-blue-600/30 text-blue-400'
                  : 'text-gray-300 hover:bg-gray-800/70 hover:text-blue-400'
              }`}
            >
              <ClipboardList className="h-5 w-5 mr-3" />
              Rentals
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/admin/reviews')}
              className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
                isActive('/admin/reviews')
                  ? 'bg-blue-600/30 text-blue-400'
                  : 'text-gray-300 hover:bg-gray-800/70 hover:text-blue-400'
              }`}
            >
              <MessageSquare className="h-5 w-5 mr-3" />
              Reviews
            </button>
          </li>
        </ul>
      </nav>
      
      <div className="px-4 py-4 mt-auto border-t border-gray-800/50">
        <button
          onClick={() => handleLogout()}
          className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-900/20 rounded-md transition-colors duration-300"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSideBar;