/* eslint-disable react/prop-types */
import { useState } from "react";
import { debounce } from "lodash";

const SearchCard = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [radius, setRadius] = useState(5);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false); // Toggle for Advanced Search

  // Debounced function to fetch suggestions
  const fetchSuggestions = debounce(async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`/api/petrol-stations/suggestions?query=${input}`);
      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }
      const data = await response.json();
      setSuggestions(data); // Assuming the response is an array of suggestions
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }, 300);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value); // Trigger API call for suggestions
  };

  const handleSuggestionClick = (place) => {
    setSelectedPlace(place);
    setQuery(place.name); // Set the selected suggestion's name in the input
    setSuggestions([]); // Clear suggestions
  };

  const handleSearchClick = () => {
    if (!selectedPlace) {
      alert("Please select a location from suggestions.");
      return;
    }

    const { latitude: lat, longitude: lng } = selectedPlace;
    onSearch({ lat, lng, radius: isAdvancedSearch ? radius : undefined }); // Pass radius only if advanced search is enabled
    setQuery('');
  };

  const handleRadiusChange = (e) => {
    setRadius(e.target.value);
  };

  const toggleAdvancedSearch = () => {
    setIsAdvancedSearch((prev) => !prev); // Toggle advanced search
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a location..."
          value={query}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border rounded-lg w-full max-h-48 overflow-y-auto mt-1 z-10">
            {suggestions.map((place) => (
              <li
                key={place.id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSuggestionClick(place)}
              >
                {place.name} - {place.address}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          className="bg-[#013d86] text-white px-6 py-3 rounded-lg hover:bg-[#013d86]"
          onClick={handleSearchClick}
        >
          Search
        </button>
        <button
          className={`px-6 py-3 rounded-lg ${
            isAdvancedSearch ? "bg-[#f35e04] text-white" : "bg-white text-[#f35e04] border border-[#f35e04]"
          } hover:bg-[#f35e04] hover:text-white`}
          onClick={toggleAdvancedSearch}
        >
          Advanced Search
        </button>
      </div>

      {/* Radius Dropdown (Visible Only in Advanced Search) */}
      {isAdvancedSearch && (
        <div className="mt-4">
          <label className="block font-medium mb-1">Search Radius (km):</label>
          <select
            value={radius}
            onChange={handleRadiusChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">1 km</option>
            <option value="5">5 km</option>
            <option value="10">10 km</option>
            <option value="20">20 km</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default SearchCard;
