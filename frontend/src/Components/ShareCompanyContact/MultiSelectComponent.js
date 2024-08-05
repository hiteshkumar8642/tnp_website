// DropdownCheckbox.js
import React, { useState } from 'react';
import "./ShareCompanyContact.css";

const MultiSelectComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        setSelectedOptions((prev) => 
            prev.includes(value)
                ? prev.filter((option) => option !== value)
                : [...prev, value]
        );
    };

    return (
        <div className="relative inline-block">
            <h1 className='text-lg'>Job Type</h1>
            <button
                onClick={toggleDropdown}
                className="selectBtn dark:bg-blue-700 bg-white text-black py-2 rounded-md outline outline-1 px-24"
            >
                Select
            </button>
            {isOpen && (
                <div className="absolute bg-white border rounded-md dark:bg-gray-800 mt-2 py-2 shadow-lg z-10 selectBar">
                    <label className="block px-4 py-2 cursor-pointer">
                        <input
                            type="checkbox"
                            value="Intern"
                            checked={selectedOptions.includes("Intern")}
                            onChange={handleCheckboxChange}
                            className="mr-2 cursor-pointer"
                        />
                        Intern
                    </label>
                    <label className="block px-4 py-2 cursor-pointer">
                        <input
                            type="checkbox"
                            value="SummerIntern"
                            checked={selectedOptions.includes("SummerIntern")}
                            onChange={handleCheckboxChange}
                            className="mr-2 cursor-pointer"
                        />
                        Summer Intern
                    </label>
                    <label className="block px-4 py-2 cursor-pointer">
                        <input
                            type="checkbox"
                            value="FTE"
                            checked={selectedOptions.includes("FTE")}
                            onChange={handleCheckboxChange}
                            className="mr-2 cursor-pointer"
                        />
                        FTE
                    </label>
                    <label className="block px-4 py-2 cursor-pointer">
                        <input
                            type="checkbox"
                            value="PPO"
                            checked={selectedOptions.includes("PPO")}
                            onChange={handleCheckboxChange}
                            className="mr-2 cursor-pointer"
                        />
                        PPO
                    </label>
                </div>
            )}
        </div>
    );
};

export default MultiSelectComponent;
