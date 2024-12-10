/* eslint-disable react/prop-types */
import { useState } from "react";

const AdvancedSearch = ({ onRadiusChange }) => {
  const [radius, setRadius] = useState(5);

  const handleRadiusChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setRadius(value);
    onRadiusChange(value);
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      <label className="font-medium">Search Radius (km):</label>
      <input
        type="range"
        min="1"
        max="50"
        step="1"
        value={radius}
        className="w-full"
        onChange={handleRadiusChange}
      />
      <span>{radius} km</span>
    </div>
  );
};

export default AdvancedSearch;
