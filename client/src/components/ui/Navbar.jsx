import React, { useState, useEffect, useRef } from 'react';
import { Car, Menu, X, User, ChevronDown, Settings, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const mobileProfileMenuRef = useRef(null);
  
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [navigate]);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) &&
        (mobileProfileMenuRef.current && !mobileProfileMenuRef.current.contains(event.target))
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setProfileMenuOpen(false);
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Vehicles', path: '/' },
    { name: 'About Us', path: '/' }
  ];

  return (
    <div className="relative z-50">
      {/* Main Navbar */}
      <nav 
        className={`
          fixed w-full top-0 transition-all duration-300 ease-in-out
          ${scrolled 
            ? 'bg-gray-900/90 backdrop-blur-md shadow-lg shadow-black/20 py-2 border-b border-gray-800/50' 
            : 'bg-transparent py-4'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center group">
                <div className={`
                  ${scrolled ? 'bg-blue-900/30' : 'bg-blue-900/20'} 
                  rounded-full p-2 mr-2 transition-all duration-300 group-hover:rotate-12
                  group-hover:shadow-md group-hover:shadow-blue-500/20
                `}>
                  <Car className={`
                    h-6 w-6 text-blue-400 transform transition-transform duration-500 ease-in-out
                    group-hover:text-blue-300
                  `} />
                </div>
                <div className='cursor-pointer' onClick={() => handleNavigation("/")}>
                  <span className={`
                    ml-1 font-bold bg-clip-text text-transparent transition-all duration-300
                    bg-gradient-to-r from-blue-400 to-blue-600
                    ${scrolled ? 'text-xl' : 'text-2xl'}
                  `}>
                    Wheelie
                  </span>
                  <span className="block text-xs text-gray-400 -mt-1 ml-1">Premium Car Rentals</span>
                </div>
              </div>
            </div>
            
            {/* Center Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((item) => (
                <button 
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className="relative text-gray-300 hover:text-blue-400 transition-colors duration-300 group"
                >
                  <span>{item.name}</span>
                  {/* Animated underline on hover */}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>
            
            {/* Right Side - Auth Buttons or Profile Icon */}
            <div className="hidden md:flex items-center space-x-3">
              {!user ? (
                <>
                  <button 
                    onClick={() => handleNavigation("/login")} 
                    className="
                      flex items-center px-4 py-2 text-sm font-medium 
                      text-gray-300 hover:text-blue-400 
                      transition-colors duration-300
                      border border-transparent hover:border-gray-700 rounded-full
                      hover:bg-gray-800/50
                    "
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </button>
                  <button 
                    onClick={() => handleNavigation("/register")} 
                    className="
                      px-5 py-2 text-sm font-medium text-white 
                      bg-gradient-to-r from-blue-700 to-blue-500 
                      rounded-full hover:shadow-lg hover:shadow-blue-600/20
                      transition-all duration-300 transform hover:translate-y-[-2px]
                      border border-blue-700/50
                    "
                  >
                    Register Now
                  </button>
                </>
              ) : (
                <div className="relative" ref={profileMenuRef}>
                  <button 
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="
                      flex items-center px-3 py-2 text-sm font-medium 
                      text-gray-300 hover:text-blue-400 
                      transition-colors duration-300
                      border border-gray-700/50 rounded-full
                      hover:bg-gray-800/50 bg-gray-900/50
                    "
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-700/30 flex items-center justify-center mr-2 border border-blue-600/30">
                      <User className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="mr-1">{user?.name || 'Profile'}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${profileMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Profile dropdown menu */}
                  <div 
                    className={`
                      absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md border border-gray-800/50 
                      rounded-lg shadow-lg shadow-black/30 overflow-hidden transition-all duration-300 
                      ${profileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}
                    `}
                  >
                    <div className="py-1">
                      <button 
                        onClick={() => handleNavigation("/profile/edit")}
                        className="
                          flex items-center w-full text-left px-4 py-2 text-sm text-gray-300
                          hover:bg-gray-800/70 hover:text-blue-400 transition-colors
                        "
                      >
                        <Settings className="h-4 w-4 mr-2 text-gray-400" />
                        Edit Profile
                      </button>
                      <button 
                        onClick={() => handleNavigation("/profile/rentals")}
                        className="
                          flex items-center w-full text-left px-4 py-2 text-sm text-gray-300
                          hover:bg-gray-800/70 hover:text-blue-400 transition-colors
                        "
                      >
                        <Package className="h-4 w-4 mr-2 text-gray-400" />
                        My Rentals
                      </button>
                      <div className="border-t border-gray-800/50 my-1"></div>
                      <button 
                        onClick={handleLogout}
                        className="
                          flex items-center w-full text-left px-4 py-2 text-sm text-gray-300
                          hover:bg-gray-800/70 hover:text-red-400 transition-colors
                        "
                      >
                        <X className="h-4 w-4 mr-2 text-gray-400" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              {user && (
                <div className="mr-2">
                  <button 
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="
                      flex items-center justify-center p-2 rounded-full 
                      text-gray-300 hover:text-blue-400 focus:outline-none
                      hover:bg-gray-800/50 transition-colors bg-gray-900/50
                      border border-gray-700/50
                    "
                  >
                    <User className="h-5 w-5" />
                  </button>
                  
                  {/* Mobile profile dropdown */}
                  <div 
                    className={`
                      absolute right-16 top-16 w-48 bg-gray-900/95 backdrop-blur-md border border-gray-800/50 
                      rounded-lg shadow-lg shadow-black/30 overflow-hidden transition-all duration-300 z-50
                      ${profileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}
                    `}
                    ref={mobileProfileMenuRef}
                  >
                    <div className="py-1">
                      <button 
                        onClick={() => handleNavigation("/profile/edit")}
                        className="
                          flex items-center w-full text-left px-4 py-2 text-sm text-gray-300
                          hover:bg-gray-800/70 hover:text-blue-400 transition-colors
                        "
                      >
                        <Settings className="h-4 w-4 mr-2 text-gray-400" />
                        Edit Profile
                      </button>
                      <button 
                        onClick={() => handleNavigation("/profile/rentals")}
                        className="
                          flex items-center w-full text-left px-4 py-2 text-sm text-gray-300
                          hover:bg-gray-800/70 hover:text-blue-400 transition-colors
                        "
                      >
                        <Package className="h-4 w-4 mr-2 text-gray-400" />
                        My Rentals
                      </button>
                      <div className="border-t border-gray-800/50 my-1"></div>
                      <button 
                        onClick={handleLogout}
                        className="
                          flex items-center w-full text-left px-4 py-2 text-sm text-gray-300
                          hover:bg-gray-800/70 hover:text-red-400 transition-colors
                        "
                      >
                        <X className="h-4 w-4 mr-2 text-gray-400" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="
                  inline-flex items-center justify-center p-2 rounded-full 
                  text-gray-300 hover:text-blue-400 focus:outline-none
                  hover:bg-gray-800/50 transition-colors
                "
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`
            ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'} 
            md:hidden overflow-hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800/50
            transition-all duration-300 ease-in-out
          `}
        >
          <div className="py-2 px-4 space-y-1">
            {navLinks.map((item) => (
              <button 
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className="
                  block w-full text-left px-3 py-2 rounded-md text-base font-medium 
                  text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 transition-colors
                "
              >
                {item.name}
              </button>
            ))}
          </div>
          
          <div className="pt-2 pb-3 border-t border-gray-800/50">
            <div className="px-4 space-y-2">
              {!user ? (
                <>
                  <button 
                    onClick={() => handleNavigation("/login")} 
                    className="
                      block w-full text-left px-3 py-2 rounded-md text-base font-medium 
                      text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 transition-colors
                    "
                  >
                    Sign in
                  </button>
                  <button 
                    onClick={() => handleNavigation("/register")} 
                    className="
                      block w-full text-left px-3 py-2 rounded-md text-base font-medium 
                      text-white bg-gradient-to-r from-blue-700 to-blue-500 
                      hover:from-blue-800 hover:to-blue-600 transition-all
                    "
                  >
                    Register
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleLogout} 
                  className="
                    block w-full text-left px-3 py-2 rounded-md text-base font-medium 
                    text-white bg-gradient-to-r from-red-700 to-red-500 
                    hover:from-red-800 hover:to-red-600 transition-all
                  "
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;