import React, { useState, useEffect } from "react";
import { modifyUserData } from "../../api/modifyUser";
import { toast } from "react-hot-toast";

const ToggleButtonGroup = ({ is_placed, is_verified, is_spp, user_id }) => {
  const [activeToggles, setActiveToggles] = useState([]);

  let option;
  let value;

  useEffect(() => {
    const initialActiveToggles = [];
    if (is_verified) initialActiveToggles.push(2);
    if (is_placed) initialActiveToggles.push(1);
    if (is_spp) initialActiveToggles.push(0);
    setActiveToggles(initialActiveToggles);
  }, [is_verified, is_placed, is_spp]);

  const labels = ["SPP", "Placed", "Verified"];

  const handleToggle = (index) => {
    setActiveToggles((prevActiveToggles) => {
      const isActive = prevActiveToggles.includes(index);
      const newActiveToggles = isActive
        ? prevActiveToggles.filter((item) => item !== index)
        : [...prevActiveToggles, index];

      console.log(`Toggle ${index} is now ${!isActive}`);
      toggleSetter(index, !isActive);
      return newActiveToggles;
    });
  };
  async function toggleSetter(a, b) {
    option = a;
    value = b;
    const formData = { value: value, option: option, user_id: user_id };
    try {
      const response = await modifyUserData(formData);
      if (response.status === 200) {
        toast.success("Status Update");
      } else {
        toast.error("Failed to Update status");
      }
    } catch (err) {
      toast.error("Error occured while sending data");
    }
  }

  return (
    <div className="flex items-center justify-center gap-4">
      {labels.map((label, index) => (
        <label
          key={index}
          htmlFor={`toggle${index}`}
          className="flex items-center cursor-pointer"
        >
          <div className="relative">
            <input
              type="checkbox"
              id={`toggle${index}`}
              className="sr-only"
              checked={activeToggles.includes(index)}
              onChange={() => handleToggle(index)}
            />
            <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
            <div
              className={`dot absolute left-1 top-1 w-6 h-6 rounded-full transition transform ${
                activeToggles.includes(index)
                  ? "translate-x-full bg-blue-500"
                  : "bg-white"
              }`}
            ></div>
          </div>
          <div className="ml-3 text-gray-700 font-medium">{label}</div>
        </label>
      ))}
    </div>
  );
};

export default ToggleButtonGroup;
