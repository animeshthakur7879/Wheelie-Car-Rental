import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Popular search suggestions
  const suggestions = [
    'SUV', 'Convertible', 'Luxury Sedan', 'Sports Car', 'Electric Vehicle'
  ];

  return (
    <div className="w-full max-w-3xl bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.01]">
      <div className="p-4 md:p-6">
        {/* Primary search bar with enhanced effects */}
        <div className="relative mb-0">
          <div 
            className={`absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg transition-opacity duration-500 blur-md ${
              isSearchFocused ? 'opacity-30' : 'opacity-0'
            }`}
          ></div>
          <div className={`relative rounded-lg border ${
            isSearchFocused 
              ? 'border-blue-400 shadow-lg ring-2 ring-blue-600/20' 
              : 'border-transparent shadow-md'
          } transition-all duration-300 flex`}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
              <Search className={`h-5 w-5 transition-colors duration-300 ${isSearchFocused ? 'text-blue-500' : 'text-gray-400'}`} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="block w-full pl-12 pr-4 py-4 text-lg border-0 bg-transparent rounded-l-lg focus:ring-0 focus:outline-none text-white placeholder-gray-300"
              placeholder="Search for your perfect car..."
            />
            <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-indigo-600 px-6 text-white font-medium rounded-r-lg flex items-center justify-center transition-all duration-300 relative overflow-hidden group">
              <span className="relative z-10 flex items-center">
                Search
                <ChevronRight className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>

          {/* Popular searches chips */}
          {isSearchFocused && (
            <div className="absolute z-10 left-0 right-0 top-full mt-2 p-3 bg-blue-900 bg-opacity-70 backdrop-blur-md rounded-lg shadow-lg border border-blue-800 animate-fadeIn">
              <p className="text-xs text-blue-200 mb-2">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map(suggestion => (
                  <button
                    key={suggestion}
                    className="px-3 py-1 text-sm bg-blue-800 text-blue-100 rounded-full hover:bg-blue-700 transition-colors"
                    onClick={() => setSearchQuery(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;