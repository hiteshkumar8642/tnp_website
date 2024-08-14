import React from 'react';

const SearchBar = () => {
  return (
    <div className="flex justify-center items-center w-full p-4">
      <div className="flex w-full max-w-md sm:max-w-full">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 "
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none ml-2 focus:ring-2 "
        >
          Search
        </button>
      </div>
    
    </div>
  );
};

export default SearchBar;
