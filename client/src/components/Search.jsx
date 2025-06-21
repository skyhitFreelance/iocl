// // /* eslint-disable react/prop-types */
// // import { useState } from "react";
// // import { debounce } from "lodash";

// // const SearchCard = ({ onSearch }) => {
// //   const [query, setQuery] = useState("");
// //   const [radius, setRadius] = useState(5);
// //   const [selectedPlace, setSelectedPlace] = useState(null);
// //   const [suggestions, setSuggestions] = useState([]);
// //   const [isAdvancedSearch, setIsAdvancedSearch] = useState(false); // Toggle for Advanced Search

// //   // Debounced function to fetch suggestions
// //   const fetchSuggestions = debounce(async (input) => {
// //     if (!input) {
// //       setSuggestions([]);
// //       return;
// //     }

// //     try {
// //       const response = await fetch(`http://localhost:9000/petrol-stations/suggestions?query=${input}`);
// //       if (!response.ok) {
// //         throw new Error("Failed to fetch suggestions");
// //       }
// //       const data = await response.json();
// //       setSuggestions(data); // Assuming the response is an array of suggestions
// //     } catch (error) {
// //       console.error("Error fetching suggestions:", error);
// //     }
// //   }, 300);

// //   const handleInputChange = (e) => {
// //     const value = e.target.value;
// //     setQuery(value);
// //     fetchSuggestions(value); // Trigger API call for suggestions
// //   };

// //   const handleSuggestionClick = (place) => {
// //     setSelectedPlace(place);
// //     setQuery(place.name); // Set the selected suggestion's name in the input
// //     setSuggestions([]); // Clear suggestions
// //   };

// //   const handleSearchClick = () => {
// //     if (!selectedPlace) {
// //       alert("Please select a location from suggestions.");
// //       return;
// //     }

// //     const { latitude: lat, longitude: lng } = selectedPlace;
// //     onSearch({ lat, lng, radius: isAdvancedSearch ? radius : undefined }); // Pass radius only if advanced search is enabled
// //     setQuery('');
// //   };

// //   const handleRadiusChange = (e) => {
// //     setRadius(e.target.value);
// //   };

// //   const toggleAdvancedSearch = () => {
// //     setIsAdvancedSearch((prev) => !prev); // Toggle advanced search
// //   };

// //   return (
// //     <div className="bg-white shadow rounded-lg p-4">
// //       {/* Search Input */}
// //       <div className="mb-4">
// //         <input
// //           type="text"
// //           placeholder="Search for a location..."
// //           value={query}
// //           onChange={handleInputChange}
// //           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //         />
// //         {suggestions.length > 0 && (
// //           <ul className="absolute bg-white border rounded-lg w-full max-h-48 overflow-y-auto mt-1 z-10">
// //             {suggestions.map((place) => (
// //               <li
// //                 key={place.id}
// //                 className="p-2 hover:bg-gray-200 cursor-pointer"
// //                 onClick={() => handleSuggestionClick(place)}
// //               >
// //                 {place.name} - {place.address}
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </div>

// //       {/* Buttons */}
// //       <div className="flex gap-4">
// //         <button
// //           className="bg-[#013d86] text-white px-6 py-3 rounded-lg hover:bg-[#013d86]"
// //           onClick={handleSearchClick}
// //         >
// //           Search
// //         </button>
// //         <button
// //           className={`px-6 py-3 rounded-lg ${
// //             isAdvancedSearch ? "bg-[#f35e04] text-white" : "bg-white text-[#f35e04] border border-[#f35e04]"
// //           } hover:bg-[#f35e04] hover:text-white`}
// //           onClick={toggleAdvancedSearch}
// //         >
// //           Advanced Search
// //         </button>
// //       </div>

// //       {/* Radius Dropdown (Visible Only in Advanced Search) */}
// //       {isAdvancedSearch && (
// //         <div className="mt-4">
// //           <label className="block font-medium mb-1">Search Radius (km):</label>
// //           <select
// //             value={radius}
// //             onChange={handleRadiusChange}
// //             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           >
// //             <option value="1">1 km</option>
// //             <option value="5">5 km</option>
// //             <option value="10">10 km</option>
// //             <option value="20">20 km</option>
// //           </select>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SearchCard;
// /* eslint-disable react/prop-types */
// // import { useEffect, useRef, useState } from "react";
// // import { debounce } from "lodash";
// // import { getTenantConfig } from "../tenantConfig";

// // const SearchCard = ({ onSearch }) => {
// //   const [query, setQuery] = useState("");
// //   const [radius, setRadius] = useState(5);
// //   const [selectedPlace, setSelectedPlace] = useState(null);
// //   const [suggestions, setSuggestions] = useState([]);
// //   const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
// //   const dropdownRef = useRef(null);
// //   const config = getTenantConfig();
// //   const fetchSuggestions = debounce(async (input) => {
// //     if (!input) {
// //       setSuggestions([]);
// //       return;
// //     }

// //     try {
// //       const response = await fetch(
// //         `https://demo.skyhitmedia.website/petrol-stations/suggestions?query=${input}&tenant=${config.tenant}`
// //       );
// //       if (!response.ok) {
// //         throw new Error("Failed to fetch suggestions");
// //       }
// //       const data = await response.json();
// //       setSuggestions(data); // Assuming the response is an array of suggestions
// //     } catch (error) {
// //       console.error("Error fetching suggestions:", error);
// //     }
// //   }, 300);

// //   const handleInputChange = (e) => {
// //     const value = e.target.value;
// //     setQuery(e.target.value);
// //     setSelectedPlace(null);
// //     fetchSuggestions(value);
// //   };

// //   const handleSuggestionClick = (place) => {
// //     console.log(place, "lslslsls");
// //     setSelectedPlace(place);
// //     setQuery(place.name); // Set the selected suggestion's name in the input
// //     setSuggestions([]); // Clear suggestions
// //   };

// //   const handleSearchClick = () => {
// //     if (!query.trim()) {
// //       alert("Please enter a keyword to search.");
// //       return;
// //     }
// //     const searchQuery = selectedPlace ? selectedPlace.name : query;
// //     onSearch(searchQuery);
// //     setQuery("");
// //     setSelectedPlace(null);
// //     setSuggestions([]);
// //   };

// //   const handleRadiusChange = (e) => {
// //     setRadius(e.target.value);
// //   };

// //   const toggleAdvancedSearch = () => {
// //     setIsAdvancedSearch((prev) => !prev);
// //   };

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         setSuggestions([]); // Close the suggestions dropdown
// //       }
// //     };

// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //     };
// //   }, []);

// //   return (
// //     <div className="bg-white flex flex-col w-full relative items-center rounded-lg p-1 border-[#013d86] gap-16">
// //       <h1 className="text-lg font-bold text-[#013d86] mb-2 border-b-4 border-[#013d86] w-full text-center pb-2">
// //         {config?.name}
// //       </h1>
// //       {/* Search Input */}
// //       <div className="mb-4 w-full relative flex items-center flex-col gap-3">
// //         <h2 className="text-xl font-medium mb-2">
// //           Locate the nearest fuel station(s)
// //         </h2>
// //         <div className="relative w-full mb-4">
// //           <input
// //             type="text"
// //             placeholder="Search for a location..."
// //             value={query}
// //             onChange={handleInputChange}
// //             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //           {suggestions.length > 0 && (
// //             <ul
// //               ref={dropdownRef}
// //               className="absolute top-full left-0 w-full bg-white border rounded-lg max-h-48 overflow-y-auto mt-1 z-10 shadow-md"
// //             >
// //               {suggestions.map((place) => (
// //                 <li
// //                   key={place.id}
// //                   className="p-2 hover:bg-gray-200 cursor-pointer text-ellipsis whitespace-nowrap overflow-hidden"
// //                   onClick={() => handleSuggestionClick(place)}
// //                   title={`${place.name} - ${place.address}`}
// //                 >
// //                   {place.name} - {place.address}
// //                 </li>
// //               ))}
// //             </ul>
// //           )}
// //         </div>
// //         {/* Buttons */}
// //         <div className="flex gap-4 items-center">
// //           <button
// //             className="bg-[#013d86] text-white px-6 py-1 lg:py-3 rounded-lg hover:bg-[#013d86]"
// //             onClick={handleSearchClick}
// //           >
// //             Search
// //           </button>
// //           <button
// //               className={`px-6 py-1 lg:py-3 rounded-lg ${
// //                 isAdvancedSearch
// //                   ? config.tenant === 'hpdef'
// //                     ? 'bg-hpdefSecondary text-white'
// //                     : 'bg-ioclSecondary text-white'
// //                   : config.tenant === 'hpdef'
// //                   ? 'bg-white text-hpdefSecondary border border-hpdefSecondary'
// //                   : 'bg-white text-ioclSecondary border border-ioclSecondary'
// //               } ${
// //                 config.tenant === 'hpdef'
// //                   ? 'hover:bg-hpdefSecondary hover:text-white'
// //                   : 'hover:bg-ioclSecondary hover:text-white'
// //               }`}
// //             onClick={toggleAdvancedSearch}
// //           >
// //             Advanced Search
// //           </button>
// //         </div>
// //       </div>

// //       {/* Radius Dropdown (Visible Only in Advanced Search) */}
// //       {isAdvancedSearch && (
// //         <div className="mt-4">
// //           <label className="block font-medium mb-1">Search Radius (km):</label>
// //           <select
// //             value={radius}
// //             onChange={handleRadiusChange}
// //             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           >
// //             <option value="1">1 km</option>
// //             <option value="5">5 km</option>
// //             <option value="10">10 km</option>
// //             <option value="20">20 km</option>
// //           </select>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SearchCard;



// import { useEffect, useRef, useState } from "react";
// import { debounce } from "lodash";
// import { getTenantConfig } from "../tenantConfig";

// const SearchCard = ({ onSearch }) => {
//   const [query, setQuery] = useState("");
//   const [radius, setRadius] = useState(5);
//   const [selectedPlace, setSelectedPlace] = useState(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
//   const [activeTab, setActiveTab] = useState("Fuel Station");

//   const dropdownRef = useRef(null);
//   const config = getTenantConfig();

//   const fetchSuggestions = debounce(async (input) => {
//     if (!input) {
//       setSuggestions([]);
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://demo.skyhitmedia.website/petrol-stations/suggestions?query=${input}&tenant=${config.tenant}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch suggestions");
//       }
//       const data = await response.json();
//       setSuggestions(data);
//     } catch (error) {
//       console.error("Error fetching suggestions:", error);
//     }
//   }, 300);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);
//     setSelectedPlace(null);
//     fetchSuggestions(value);
//   };

//   const handleSuggestionClick = (place) => {
//     setSelectedPlace(place);
//     setQuery(place.name);
//     setSuggestions([]);
//   };

//   const handleSearchClick = () => {
//     if (!query.trim()) {
//       alert("Please enter a keyword to search.");
//       return;
//     }
//     const searchQuery = selectedPlace ? selectedPlace.name : query;
//     onSearch(searchQuery);
//     setQuery("");
//     setSelectedPlace(null);
//     setSuggestions([]);
//   };

//   const handleRadiusChange = (e) => {
//     setRadius(e.target.value);
//   };

//   const toggleAdvancedSearch = () => {
//     setIsAdvancedSearch((prev) => !prev);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setSuggestions([]);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="bg-white flex flex-col w-full relative items-center rounded-lg p-1 border-[#013d86] gap-8">
//       <h1 className="text-lg font-bold text-[#013d86] mb-2 border-b-4 border-[#013d86] w-full text-center pb-2">
//         {config?.name}
//       </h1>

//       {/* Tab Headers */}
//       {/* <div className="flex justify-center gap-4 mb-4">
//         <button
//           onClick={() => setActiveTab("Fuel Station")}
//           className={`px-4 py-2 rounded-lg font-semibold ${
//             activeTab === "Fuel Station"
//               ? "bg-[#f35e04] text-white"
//               : "bg-gray-100 text-gray-700"
//           }`}
//         > */}
//         <div className="flex justify-center gap-4 mb-4">
//   <button
//     onClick={() => setActiveTab("Fuel Station")}
//     className={`px-7 py-2 rounded-lg font-semibold border ${
//       activeTab === "Fuel Station"
//         ? "bg-[#f35e04] text-white border-[#f35e04]"  // active: border same as bg
//         : "bg-gray-100 text-gray-700 border-orange-500"   // inactive: light gray border
//     }`}
//   >
//           Fuel Station
//         </button>
//         <button
//           onClick={() => setActiveTab("dispensers")}
//           className={`px-7 py-2 rounded-lg font-semibold border ${
//             activeTab === "dispensers"
//               ? "bg-[#f35e04] text-white border-orange-600"
//               : "bg-#ffff-100 text-gray-700 border-orange-500"
//           }`}
//         >
//           Dispensers
//         </button>
//       </div>

//       {/* Tab Content */}
//       {activeTab === "Fuel Station" && (
//         <div className="w-full flex flex-col gap-6">
//           <div className="text-xl font-medium text-center">
//             Locate the nearest fuel station(s)
//           </div>
//           <div className="relative w-full">
//             <input
//               type="text"
//               placeholder="Search for a location..."
//               value={query}
//               onChange={handleInputChange}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {suggestions.length > 0 && (
//               <ul
//                 ref={dropdownRef}
//                 className="absolute top-full left-0 w-full bg-white border rounded-lg max-h-48 overflow-y-auto mt-1 z-10 shadow-md"
//               >
//                 {suggestions.map((place) => (
//                   <li
//                     key={place.id}
//                     className="p-2 hover:bg-gray-200 cursor-pointer text-ellipsis whitespace-nowrap overflow-hidden"
//                     onClick={() => handleSuggestionClick(place)}
//                     title={`${place.name} - ${place.address}`}
//                   >
//                     {place.name} - {place.address}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           <div className="flex gap-4 items-center">
//             <button
//               className="bg-[#013d86] text-white px-6 py-2 rounded-lg hover:bg-[#012a62]"
//               onClick={handleSearchClick}
//             >
//               Search
//             </button>
//             <button
//               className={`px-6 py-2 rounded-lg ${
//                 isAdvancedSearch
//                   ? config.tenant === "hpdef"
//                     ? "bg-hpdefSecondary text-white"
//                     : "bg-ioclSecondary text-white"
//                   : config.tenant === "hpdef"
//                   ? "bg-white text-hpdefSecondary border border-hpdefSecondary"
//                   : "bg-white text-ioclSecondary border border-ioclSecondary"
//               } ${
//                 config.tenant === "hpdef"
//                   ? "hover:bg-hpdefSecondary hover:text-white"
//                   : "hover:bg-ioclSecondary hover:text-white"
//               }`}
//               onClick={toggleAdvancedSearch}
//             >
//               Advanced Search
//             </button>
//           </div>

//           {isAdvancedSearch && (
//             <div className="w-full">
//               <label className="block font-medium mb-1">
//                 Search Radius (km):
//               </label>
//               <select
//                 value={radius}
//                 onChange={handleRadiusChange}
//                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="1">1 km</option>
//                 <option value="5">5 km</option>
//                 <option value="10">10 km</option>
//                 <option value="20">20 km</option>
//               </select>
//             </div>
//           )}
//         </div>
//       )}

//       {activeTab === "dispensers" && (
//         <div className="w-full text-center text-gray-600 py-6">
//           {/* Replace this with your actual dispenser-related content */}
//           <p className="text-lg font-medium">Dispenser info will go here.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchCard;





import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { getTenantConfig } from "../tenantConfig";

const SearchCard = ({ onSearch, activeTab, setActiveTab }) => {
  const [query, setQuery] = useState("");
  const [radius, setRadius] = useState(5);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

  const dropdownRef = useRef(null);
  const config = getTenantConfig();

  const fetchSuggestions = useCallback(
    debounce(async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      let endpoint;
        if (activeTab === "Fuel Station") {
          endpoint = `https://demo.skyhitmedia.website/petrol-stations/suggestions?query=${input}&tenant=${config.tenant}`;
        } else {
          endpoint = `https://demo.skyhitmedia.website/dispensers/suggestions?query=${input}&tenant=${config.tenant}`;
        }

      const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("Failed to fetch suggestions");
        }
        const data = await response.json();
        setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }, 300),
  [config.tenant]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedPlace(null);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (place) => {
    setSelectedPlace(place);
    setQuery(place.name);
    setSuggestions([]);
  };

  const handleSearchClick = () => {
    if (!query.trim()) {
      alert("Please enter a keyword to search.");
      return;
    }
    const searchQuery = selectedPlace ? selectedPlace.name : query;
    onSearch({query: searchQuery,
      tab: activeTab,
      radius: isAdvancedSearch ? radius : null});
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
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white flex flex-col w-full relative items-center rounded-lg p-1 border-[#013d86] gap-6">
      {/* Title */}
      <h1 className="text-lg font-bold text-[#013d86] border-b-4 border-[#013d86] w-full text-center pb-2">
        {config?.name}
      </h1>

      {/* Main Heading */}
      <div className="text-xl font-medium text-center text-[#013d86]">
        {activeTab === "Fuel Station"
          ? "Locate the nearest fuel station(s)"
          : "Locate the nearest dispenser(s)"}
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setActiveTab("Fuel Station")}
          className={`px-7 py-2 rounded-lg font-semibold border ${
            activeTab === "Fuel Station"
              ? "bg-[#f35e04] text-white border-[#f35e04]"
              : "bg-gray-100 text-gray-700 border-orange-500"
          }`}
        >
          Retail Outlets
        </button>
        {config.tenant !== "hpdef" && <button
          onClick={() => setActiveTab("dispensers")}
          className={`px-7 py-2 rounded-lg font-semibold border ${
            activeTab === "dispensers"
              ? "bg-[#f35e04] text-white border-orange-600"
              : "bg-gray-100 text-gray-700 border-orange-500"
          }`}
        >
          Dispensers
        </button>}
      </div>

      {/* Fuel Station Search */}
     
        <div className="w-full flex flex-col gap-6">
          <div className="relative w-full">
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
                className="absolute top-full left-0 w-full bg-white border rounded-lg max-h-48 overflow-y-auto mt-1 z-10 shadow-md"
              >
                {suggestions.map((place) => (
                  <li
                    key={place.id}
                    className="p-2 hover:bg-gray-200 cursor-pointer text-ellipsis whitespace-nowrap overflow-hidden"
                    onClick={() => handleSuggestionClick(place)}
                    title={`${place.name} - ${place.address}`}
                  >
                    {place.name} - {place.address}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex gap-4 items-center justify-center">
            <button
              className="bg-[#013d86] text-white px-6 py-2 rounded-lg hover:bg-[#012a62]"
              onClick={handleSearchClick}
            >
              Search
            </button>
            <button
              className={`px-6 py-2 rounded-lg ${
                isAdvancedSearch
                  ? config.tenant === "hpdef"
                    ? "bg-hpdefSecondary text-white"
                    : "bg-ioclSecondary text-white"
                  : config.tenant === "hpdef"
                  ? "bg-white text-hpdefSecondary border border-hpdefSecondary"
                  : "bg-white text-ioclSecondary border border-ioclSecondary"
              } ${
                config.tenant === "hpdef"
                  ? "hover:bg-hpdefSecondary hover:text-white"
                  : "hover:bg-ioclSecondary hover:text-white"
              }`}
              onClick={toggleAdvancedSearch}
            >
              Advanced Search
            </button>
          </div>

          {isAdvancedSearch && (
            <div className="w-full">
              <label className="block font-medium mb-1">
                Search Radius (km):
              </label>
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
    
      {/* Dispenser Section */}
      {/* {activeTab === "dispensers" && (
        <div className="w-full flex flex-col gap-6 text-center text-gray-600 py-6">
          <p className="text-lg font-medium">Dispenser info will go here.</p>
        </div>
      )} */}
    </div>
  );
};

export default SearchCard;
