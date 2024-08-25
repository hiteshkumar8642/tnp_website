import React, { useState, useEffect } from 'react';

const ToggleButtonGroup = (student) => {

  const [activeToggles, setActiveToggles] = useState([]);
  let is_placed=true;
  let is_verified=true;
//   console.log("jdsvhjd",is_placed);
//     console.log("njcjh",student?.is_verified);
  useEffect(() => {
    // Set default values based on the passed props
    const initialActiveToggles = [];
    
    if (is_verified) initialActiveToggles.push(0); // Assuming SPP corresponds to index 0
    if (is_placed) initialActiveToggles.push(1); // Assuming fullTime corresponds to index 1
    setActiveToggles(initialActiveToggles);
  }, [is_verified, is_placed]);

  const handleApiCall = async (label, isActive) => {
    let apiEndpoint;
    switch (label) {
      case 'SPP':
        apiEndpoint = 'https://your-api-endpoint.com/spp';
        break;
      case 'fullTime':
        apiEndpoint = 'https://your-api-endpoint.com/fullTime';
        break;
      case 'XYZ':
        apiEndpoint = 'https://your-api-endpoint.com/xyz';
        break;
      default:
        return;
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive,
        }),
      });

      const data = await response.json();
      console.log(`API Response for ${label}:`, data);
    } catch (error) {
      console.error(`API Error for ${label}:`, error);
    }
  };

  const handleToggle = async (id, label) => {
    const isActive = !activeToggles.includes(id);

    if (isActive) {
      setActiveToggles([...activeToggles, id]);
    } else {
      setActiveToggles(activeToggles.filter((toggleId) => toggleId !== id));
    }

    await handleApiCall(label, isActive);
  };

  const labels = ["SPP", "fullTime", "XYZ"];

  return (
    <div className="flex items-center justify-center gap-4">
      {labels.map((label, index) => (
        <label key={index} htmlFor={`toggle${index}`} className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              id={`toggle${index}`}
              className="sr-only"
              checked={activeToggles.includes(index)}
              onChange={() => handleToggle(index, label)}
            />
            <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
            <div
              className={`dot absolute left-1 top-1 w-6 h-6 rounded-full transition transform ${
                activeToggles.includes(index) ? 'translate-x-full bg-blue-500' : 'bg-white'
              }`}
            ></div>
          </div>
          <div className="ml-3 text-gray-700 font-medium">
            {label}
          </div>
        </label>
      ))}
    </div>
  );
};

export default ToggleButtonGroup;
