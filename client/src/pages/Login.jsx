import React, { useEffect, useState } from 'react';
import { Mail, Lock, Car, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const navigate = useNavigate()

  const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)

  const dispatch = useDispatch()
  
  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    dispatch(loginUser(formData))
  };

  useEffect(() => {
    if(user) {
      navigate("/")
    }

    if(user && user.isAdmin) {
      navigate("/admin")
    }

    if(isError) {
      toast.error(message)
    }
  }, [user, isError, message])

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col py-4 sm:px-6 lg:px-8">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-lg relative z-10 mt-24">
        {/* Logo */}
        <div className="flex items-center justify-center group">
          <div className="bg-blue-900/30 rounded-full p-2 transition-all duration-300 group-hover:rotate-12 group-hover:shadow-md group-hover:shadow-blue-500/20">
            <Car className="h-8 w-8 text-blue-400 transform transition-transform duration-500 ease-in-out group-hover:text-blue-300" />
          </div>
        </div>
        
        <h2 className="mt-4 text-center text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Sign in to Wheelie
        </h2>
        <p className="mt-1 text-center text-sm text-gray-400">
          Don't have an account yet?{' '}
          <a href="/register" className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300">
            Create an account
          </a>
        </p>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
        <div className="bg-gray-900/95 backdrop-blur-md py-6 px-4 shadow-2xl rounded-lg sm:px-10 border border-gray-800/50">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 block w-full py-2 bg-gray-800/70 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 block w-full py-2 bg-gray-800/70 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-300 focus:outline-none transition-colors duration-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500 focus:ring-offset-gray-900"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-blue-700/50 text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-700 to-blue-500 hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300 transform hover:translate-y-[-2px]"
              >
                <span className="flex items-center">
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800/50 text-sm font-medium text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-colors duration-300"
              >
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                  <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                  <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                  <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                </svg>
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800/50 text-sm font-medium text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-colors duration-300"
              >
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M22.5 12.0002C22.5 6.75019 18.2 2.5 12.9 2.5C7.57995 2.5 3.29999 6.75019 3.29999 12.0002C3.29999 16.7 6.79995 20.6 11.4 21.4V14.7H8.89999V12H11.4V9.90019C11.4 7.49979 12.9 6.09985 15.1 6.09985C16.2 6.09985 17.3 6.29993 17.3 6.29993V8.69971H16C14.7 8.69971 14.4 9.49902 14.4 10.3V12H17.2L16.8 14.7H14.3V21.4C18.9 20.6 22.5 16.7 22.5 12.0002Z" fill="#1877F2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Premium tagline */}
        <div className="mt-6 text-center">
          <span className="text-xs text-gray-500">Premium Car Rentals</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;