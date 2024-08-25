// DropdownCheckbox.js
import React, { useState } from "react";

const MultiSelect = ({formData , setFormData, handleInputChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };



  return (
    <div className="relative inline-block">
      <h1 className="text-lg">Job Type</h1>
      <button
        onClick={toggleDropdown}
        className="px-10 py-9"
      >
        Select
      </button>
      {isOpen && (
        <div className="absolute bg-white border rounded-md dark:bg-gray-800 mt-2 py-2 shadow-lg z-10 selectBar">
          <label className="block px-4 py-2 cursor-pointer">
            <input
                type="checkbox"
                name="is_intern"
                checked={formData.is_intern}
                onChange={handleInputChange}
                className="mr-2 cursor-pointer"
              />
            Intern
          </label>
          <label className="block px-4 py-2 cursor-pointer">
            <input
                type="checkbox"
                name="is_fte"
                checked={formData.is_fte}
                onChange={handleInputChange}
                className="mr-2 cursor-pointer"
              />
            FTE
          </label>
          <label className="block px-4 py-2 cursor-pointer">
            <input
                type="checkbox"
                name="is_ppo"
                checked={formData.is_ppo}
                onChange={handleInputChange}
                className="mr-2 cursor-pointer"
              />
            PPO
          </label>
          <label className="block px-4 py-2 cursor-pointer">
            <input
                type="checkbox"
                name="is_spp"
                checked={formData.is_spp}
                onChange={handleInputChange}
                className="mr-2 cursor-pointer"
              />
            SPP
          </label>
          <label className="block px-4 py-2 cursor-pointer">
            <input
                type="checkbox"
                name="is_sip"
                checked={formData.is_sip}
                onChange={handleInputChange}
                className="mr-2 cursor-pointer"
              />
            SIP
          </label>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
