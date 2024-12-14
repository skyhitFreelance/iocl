// /* eslint-disable react/prop-types */
// import { useState } from "react";
// import { debounce } from "lodash";

// const SearchCard = ({ onSearch }) => {
//   const [query, setQuery] = useState("");
//   const [radius, setRadius] = useState(5);
//   const [selectedPlace, setSelectedPlace] = useState(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [isAdvancedSearch, setIsAdvancedSearch] = useState(false); // Toggle for Advanced Search

//   // Debounced function to fetch suggestions
//   const fetchSuggestions = debounce(async (input) => {
//     if (!input) {
//       setSuggestions([]);
//       return;
//     }

//     try {
//       const response = await fetch(`https://demo.skyhitmedia.website/petrol-stations/suggestions?query=${input}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch suggestions");
//       }
//       const data = await response.json();
//       setSuggestions(data); // Assuming the response is an array of suggestions
//     } catch (error) {
//       console.error("Error fetching suggestions:", error);
//     }
//   }, 300);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);
//     fetchSuggestions(value); // Trigger API call for suggestions
//   };

//   const handleSuggestionClick = (place) => {
//     setSelectedPlace(place);
//     setQuery(place.name); // Set the selected suggestion's name in the input
//     setSuggestions([]); // Clear suggestions
//   };

//   const handleSearchClick = () => {
//     if (!selectedPlace) {
//       alert("Please select a location from suggestions.");
//       return;
//     }

//     const { latitude: lat, longitude: lng } = selectedPlace;
//     onSearch({ lat, lng, radius: isAdvancedSearch ? radius : undefined }); // Pass radius only if advanced search is enabled
//     setQuery('');
//   };

//   const handleRadiusChange = (e) => {
//     setRadius(e.target.value);
//   };

//   const toggleAdvancedSearch = () => {
//     setIsAdvancedSearch((prev) => !prev); // Toggle advanced search
//   };

//   return (
//     <div className="bg-white shadow rounded-lg p-4">
//       {/* Search Input */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search for a location..."
//           value={query}
//           onChange={handleInputChange}
//           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         {suggestions.length > 0 && (
//           <ul className="absolute bg-white border rounded-lg w-full max-h-48 overflow-y-auto mt-1 z-10">
//             {suggestions.map((place) => (
//               <li
//                 key={place.id}
//                 className="p-2 hover:bg-gray-200 cursor-pointer"
//                 onClick={() => handleSuggestionClick(place)}
//               >
//                 {place.name} - {place.address}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Buttons */}
//       <div className="flex gap-4">
//         <button
//           className="bg-[#013d86] text-white px-6 py-3 rounded-lg hover:bg-[#013d86]"
//           onClick={handleSearchClick}
//         >
//           Search
//         </button>
//         <button
//           className={`px-6 py-3 rounded-lg ${
//             isAdvancedSearch ? "bg-[#f35e04] text-white" : "bg-white text-[#f35e04] border border-[#f35e04]"
//           } hover:bg-[#f35e04] hover:text-white`}
//           onClick={toggleAdvancedSearch}
//         >
//           Advanced Search
//         </button>
//       </div>

//       {/* Radius Dropdown (Visible Only in Advanced Search) */}
//       {isAdvancedSearch && (
//         <div className="mt-4">
//           <label className="block font-medium mb-1">Search Radius (km):</label>
//           <select
//             value={radius}
//             onChange={handleRadiusChange}
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="1">1 km</option>
//             <option value="5">5 km</option>
//             <option value="10">10 km</option>
//             <option value="20">20 km</option>
//           </select>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchCard;
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

const SearchCard = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [radius, setRadius] = useState(5);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const dropdownRef = useRef(null);

  const fetchSuggestions = debounce(async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://demo.skyhitmedia.website/petrol-stations/suggestions?query=${input}`
      );
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
    setQuery(e.target.value);
    setSelectedPlace(null);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (place) => {
    console.log(place, "lslslsls");
    setSelectedPlace(place);
    setQuery(place.name); // Set the selected suggestion's name in the input
    setSuggestions([]); // Clear suggestions
  };

  const handleSearchClick = () => {
    if (!query.trim()) {
      alert("Please enter a keyword to search.");
      return;
    }
    const searchQuery = selectedPlace ? selectedPlace.name : query;
    onSearch(searchQuery);
    setQuery("");
    setSelectedPlace(null);
    setSuggestions([]);
  };

  const handleRadiusChange = (e) => {
    setRadius(e.target.value);
  };

  const toggleAdvancedSearch = () => {
    setIsAdvancedSearch((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSuggestions([]); // Close the suggestions dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white flex flex-col w-full relative items-center rounded-lg p-1 border-[#013d86] gap-16">
      <h1 className="text-lg font-bold text-[#013d86] mb-2 border-b-4 border-[#013d86] w-full text-center pb-2">IndianOil</h1>
      {/* Search Input */}
      <div className="mb-4 w-full relative flex items-center flex-col gap-3">
      <h2 className="text-xl font-medium mb-2">Locate the nearest fuel station(s)</h2>
        <input
          type="text"
          placeholder="Search for a location..."
          value={query}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {suggestions.length > 0 && (
          <ul
            ref={dropdownRef}
            className="absolute bg-white border rounded-lg max-h-48 overflow-y-auto mt-1 z-10"
          >
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
         {/* Buttons */}
      <div className="flex gap-4 items-center">
        <button
          className="bg-[#013d86] text-white px-6 py-1 lg:py-3 rounded-lg hover:bg-[#013d86]"
          onClick={handleSearchClick}
        >
          Search
        </button>
        <button
          className={`px-6 py-1 lg:py-3 rounded-lg ${
            isAdvancedSearch
              ? "bg-[#f35e04] text-white"
              : "bg-white text-[#f35e04] border border-[#f35e04]"
          } hover:bg-[#f35e04] hover:text-white`}
          onClick={toggleAdvancedSearch}
        >
          Advanced Search
        </button>
      </div>
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
