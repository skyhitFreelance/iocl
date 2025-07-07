// /* eslint-disable react/prop-types */
// import { useEffect, useState } from "react";
// import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import { FaMapMarkerAlt, FaSuitcase } from "react-icons/fa";
// import SearchCard from "./components/Search";
// import LoginPage from "./components/Login";
// import AddPetrolStation from "./components/AddPetrolStation";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Autoplay, Pagination as Page, Navigation } from "swiper/modules";
// import banner1 from "./assets/IOC Banners.png";
// import banner2 from "./assets/IOC Banners (1).png";
// import banner3 from "./assets/IOC Banners (2).png";
// import banner4 from "./assets/IOC Banners (3).png";
// import { Helmet } from "react-helmet";

// import { getTenantConfig } from "./tenantConfig";

// const banner = [banner1, banner2, banner3, banner4];

// const config = getTenantConfig();

// const StationCard = ({ station }) => {
//   const parseAddress = (address) => {
//     const parts = address.split(",");
//     return {
//       areaNumber: parts[0] || "",
//       placeName: parts[1] || "",
//       districtAndPin: parts.slice(2).join(",") || "",
//     };
//   };

//   const parsedAddress = parseAddress(station.address);

//   const googleMapsUrl =
//     station.latitude && station.longitude
//       ? `https://www.google.com/maps?q=${station.latitude},${station.longitude}`
//       : `https://www.google.com/maps?q=${encodeURIComponent(station.address)}`;

//   return (
//     <div className="bg-white drop-shadow-md rounded-lg p-4 mb-4">
//       <h2 className="text-lg font-bold text-gray-800">{config?.name}</h2>
//       <hr className="my-2" />
//       <div className="flex items-center text-sm text-gray-600 mb-2">
//         <FaSuitcase className="mr-2" />
//         <span>{station.name}</span>
//       </div>
//       <div className="flex items-start text-sm text-gray-600 mb-2">
//         <FaMapMarkerAlt className="mr-2" />
//         <div>
//           <p>{parsedAddress.areaNumber}</p>
//           <p>{parsedAddress.placeName}</p>
//           <p>
//             {parsedAddress.districtAndPin}, {station?.pincode}
//           </p>
//         </div>
//       </div>
//       <hr className="my-2" />
//       <div className="flex justify-between">
//         {station.mobile ? (
//           <a
//             href={`tel:${station.mobile}`}
//             className={
//               config.tenant === "hpdef"
//                 ? "bg-hpdefPrimary text-white py-1 px-4 rounded hover:bg-hpdefPrimary"
//                 : "bg-ioclPrimary text-white py-1 px-4 rounded hover:bg-ioclPrimary"
//             }
//           >
//             Call
//           </a>
//         ) : (
//           <button
//           className={
//             config.tenant === "hpdef"
//               ? "bg-hpdefPrimary text-white py-1 px-4 rounded cursor-not-allowed"
//               : "bg-ioclPrimary text-white py-1 px-4 rounded cursor-not-allowed"
//           }
//             disabled
//           >
//             Call
//           </button>
//         )}
//         <a
//           href={googleMapsUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           className={
//             config.tenant === "hpdef"
//               ? "bg-hpdefSecondary text-white py-1 px-4 rounded hover:bg-hpdefSecondary"
//               : "bg-ioclSecondary text-white py-1 px-4 rounded hover:bg-ioclSecondary"
//           }
//         >
//           Map
//         </a>
//       </div>
//     </div>
//   );
// };

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   return (
//     <div className="flex justify-center mt-4">
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className={`px-4 py-2 mx-1 ${
//           currentPage === 1 ? "bg-gray-300" : "bg-[#013d86] text-white"
//         } rounded`}
//       >
//         Previous
//       </button>
//       <span className="px-4 py-2 mx-1">
//         Page {currentPage} of {totalPages}
//       </span>
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className={`px-4 py-2 mx-1 ${
//           currentPage === totalPages ? "bg-gray-300" : "bg-[#013d86] text-white"
//         } rounded`}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// const Loader = () => (
//   <div className="flex justify-center items-center h-full">
//     <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#013d86]"></div>
//   </div>
// );

// const PetrolStationFinder = () => {
//   const [stations, setStations] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize] = useState(10); // Default page size
//   const [loading, setLoading] = useState(false);
//   const [totalPages, setTotalPages] = useState(0);
//   const [lastQuery, setLastQuery] = useState("default");
//   const [lastLat, setLastLat] = useState(null); // To store the last searched latitude
//   const [lastLng, setLastLng] = useState(null); // To store the last searched longitude

//   const handleSearch = async ({ query, page = 1 }) => {
//     try {
//       setLoading(true);
//       let url = `https://demo.skyhitmedia.website/petrol-stations/search?query=${encodeURIComponent(
//         query
//       )}`;
//       url += `&page=${page}&pageSize=${pageSize}`;
//       url += `&tenant=${config.tenant}`;

//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error("Failed to fetch petrol stations");
//       }
//       const data = await response.json();
//       setStations(data.data);
//       setTotalPages(Math.ceil(data.pagination.total / pageSize));
//       setLastQuery(query);
//       // setLastLat(lat);
//       // setLastLng(lng);
//     } catch (error) {
//       console.error("Error fetching petrol stations:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePageChange = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page); // Update the current page state
//     handleSearch({ query: lastQuery, page });
//   };

//   // useEffect(() => {
//   //   handleSearch({ query: "default", page: 1 }); // Replace "default" with your actual default query
//   // }, []);

//   return (
//     <div className="mx-auto">
//       <div className="text-2xl font-bold mb-4 ml-4 lg:ml-20 p-4">
//         <img
//           src={config.logo}
//           alt={`${config.name} Logo`}
//           className="h-16 w-auto mr-2"
//         />
//       </div>
//       {/* <SearchCard onSearch={(latLng) => handleSearch({ ...latLng, page: 1 })} /> */}
//       <div className="bg-custom-gradient">
//         <div className=" mx-auto max-w-6xl flex flex-col md:flex-row w-full h-ful p-4 gap-4">
//           {/* SearchCard Section */}
//           <div className="w-full md:w-1/3 bg-white flex items-start rounded-2xl p-4">
//             <SearchCard
//               onSearch={(query) => handleSearch({ query, page: 1 })}
//             />
//           </div>

//           {/* Swiper Section */}
//           <div className="w-full md:w-2/3 flex justify-center items-center rounded-md">
//             {/* Your Swiper Component */}
//             <Swiper
//               autoplay={{
//                 delay: 2500,
//                 disableOnInteraction: false,
//               }}
//               modules={[Autoplay, Page, Navigation]}
//               spaceBetween={30}
//               centeredSlides={true}
//               className="mySwiper"
//               pagination={{
//                 clickable: true,
//               }}
//               navigation={false}
//             >
//               {config?.banners.map((img, i) => (
//                 <SwiperSlide key={i}>
//                   <img src={img} alt={`Slide ${i + "1"}`} />
//                 </SwiperSlide>
//               ))}
//               {/* <SwiperSlide>
//                 <img
//                   src="https://cdn4.singleinterface.com/files/enterprise/coverphoto/99528/Banner-2-02-03-23-12-58-02.jpg"
//                   alt="Slide 2"
//                 />
//               </SwiperSlide> */}
//             </Swiper>
//           </div>
//         </div>
//       </div>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="mt-8">
//           {stations?.length > 0 && (
//             <h4 className="text-center text-3xl font-medium">
//               {lastQuery === "default" ? (
//                 "Available Petrol Stations"
//               ) : (
//                 <>
//                   {config.name} Fuel Stations in{" "}
//                   <span className={config?.tenant === 'hpdef' ? 'text-hpdefSecondary' : 'text-ioclSecondary'}>{lastQuery}</span>
//                 </>
//               )}
//             </h4>
//           )}

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 px-4">
//             {stations?.map((station) => (
//               <StationCard key={station.id} station={station} />
//             ))}
//           </div>
//         </div>
//       )}
//       {stations?.length > 0 && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       )}
//     </div>
//   );
// };

// const App = () => {
//   const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
//   const navigate = useNavigate();

//   const handleLoginSuccess = () => {
//     setLoggedIn(true);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setLoggedIn(false);
//   };

//   return (
//     <>
//       <Helmet>
//         <title>{config?.title}</title>
//         <meta
//           name="description"
//           content="Find closest IndianOil fuel station. Get accurate fuel station information e.g. address, phone no, map & timings."
//         />
//          <link rel="icon" type="image/png" href={config.favicon} />
//       </Helmet>

//       <div className="relative min-h-screen flex flex-col">
//         <div className="flex-grow">
//           <Routes>
//             <Route path="/" element={<PetrolStationFinder />} />
//             <Route
//               path="/login"
//               element={
//                 loggedIn ? (
//                   <Navigate to="/add" />
//                 ) : (
//                   <LoginPage onLogin={handleLoginSuccess} />
//                 )
//               }
//             />
//             <Route
//               path="/add"
//               element={
//                 loggedIn ? (
//                   <>
//                     <button
//                       onClick={handleLogout}
//                       className="bg-red-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-red-600 absolute right-20 m-5"
//                     >
//                       Logout
//                     </button>
//                     <AddPetrolStation loggedIn={loggedIn} />
//                   </>
//                 ) : (
//                   <Navigate to="/login" />
//                 )
//               }
//             />
//           </Routes>
//         </div>
//         <footer className="w-full text-center p-4 text-sm text-black bg-gray-100">
//           &copy; {new Date().getFullYear()} {config?.name} Clear Blue. All rights
//           reserved. Designed and Maintained by{" "}
//           <span className="font-semibold">SKYHIT MEDIA.</span>
//         </footer>
//       </div>
//     </>
//   );
// };

// export default App;

/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate, Link } from "react-router-dom";
import { FaMapMarkerAlt, FaSuitcase } from "react-icons/fa";
import SearchCard from "./components/Search";
import LoginPage from "./components/Login";
import AddPetrolStation from "./components/AddPetrolStation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination as Page, Navigation } from "swiper/modules";
import banner1 from "./assets/IOC Banners.png";
import banner2 from "./assets/IOC Banners (1).png";
import banner3 from "./assets/IOC Banners (2).png";
import banner4 from "./assets/IOC Banners (3).png";
import { Helmet } from "react-helmet";

import { getTenantConfig } from "./tenantConfig";

const banner = [banner1, banner2, banner3, banner4];

const config = getTenantConfig();

const StationCard = ({ station }) => {
  const parseAddress = (address) => {
    const parts = address.split(",");
    return {
      areaNumber: parts[0] || "",
      placeName: parts[1] || "",
      districtAndPin: parts.slice(2).join(",") || "",
    };
  };

  const parsedAddress = parseAddress(station.address);

  const googleMapsUrl =
    station.latitude && station.longitude
      ? `https://www.google.com/maps?q=${station.latitude},${station.longitude}`
      : `https://www.google.com/maps?q=${encodeURIComponent(station.address)}`;

  return (
    <div className="bg-white drop-shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-lg font-bold text-gray-800">{config?.name}</h2>
      <hr className="my-2" />
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <FaSuitcase className="mr-2" />
        <span>{station.name}</span>
      </div>
      <div className="flex items-start text-sm text-gray-600 mb-2">
        <FaMapMarkerAlt className="mr-2" />
        <div>
          <p>{parsedAddress.areaNumber}</p>
          <p>{parsedAddress.placeName}</p>
          <p>
            {parsedAddress.districtAndPin}, {station?.pincode}
          </p>
        </div>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between">
        {station.mobile &&(
          <a
            href={`tel:${station.mobile}`}
            className={
              config.tenant === "hpdef"
                ? "bg-hpdefPrimary text-white py-1 px-4 rounded hover:bg-hpdefPrimary"
                : "bg-ioclPrimary text-white py-1 px-4 rounded hover:bg-ioclPrimary"
            }
          >
            Call
          </a>
        )}
        {station?.latitude && <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={
            config.tenant === "hpdef"
              ? "bg-hpdefSecondary text-white py-1 px-4 rounded hover:bg-hpdefSecondary"
              : "bg-ioclSecondary text-white py-1 px-4 rounded hover:bg-ioclSecondary"
          }
        >
          Map
        </a>}
      </div>
    </div>
  );
};

const DispenserCard = ({ dispenser }) => {
  const parseAddress = (address) => {
    const parts = address.split(",");
    return {
      areaNumber: parts[0] || "",
      placeName: parts[1] || "",
      districtAndPin: parts.slice(2).join(",") || "",
    };
  };

  const parsedAddress = parseAddress(dispenser.address);

  const googleMapsUrl =
    dispenser.latitude && dispenser.longitude
      ? `https://www.google.com/maps?q=${dispenser.latitude},${dispenser.longitude}`
      : `https://www.google.com/maps?q=${encodeURIComponent(dispenser.address)}`;

  return (
    <div className="bg-white drop-shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-lg font-bold text-gray-800">Dispenser</h2>
      <hr className="my-2" />
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <FaSuitcase className="mr-2" />
        <span>{dispenser.name}</span>
      </div>
      <div className="flex items-start text-sm text-gray-600 mb-2">
        <FaMapMarkerAlt className="mr-2" />
        <div>
          <p>{parsedAddress.areaNumber}</p>
          <p>{parsedAddress.placeName}</p>
          <p style={{ wordBreak: "break-word" }}>
            {parsedAddress.districtAndPin}, {dispenser?.pincode}
          </p>
        </div>
      </div>
      {/* <hr className="my-2" />
      <div className="flex flex-col">
        <p className="text-sm"><strong>Status:</strong> {dispenser.status || "Active"}</p>
        <p className="text-sm"><strong>Type:</strong> {dispenser.type || "Standard"}</p>
      </div> */}
      <div className="flex justify-between mt-2">
        {dispenser?.longitude && <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={
            config.tenant === "hpdef"
              ? "bg-hpdefSecondary text-white py-1 px-4 rounded hover:bg-hpdefSecondary"
              : "bg-ioclSecondary text-white py-1 px-4 rounded hover:bg-ioclSecondary"
          }
        >
          Map
        </a>}
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-1 ${
          currentPage === 1 ? "bg-gray-300" : "bg-[#013d86] text-white"
        } rounded`}
      >
        Previous
      </button>
      <span className="px-4 py-2 mx-1">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mx-1 ${
          currentPage === totalPages ? "bg-gray-300" : "bg-[#013d86] text-white"
        } rounded`}
      >
        Next
      </button>
    </div>
  );
};

const Loader = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#013d86]"></div>
  </div>
);

const PetrolStationFinder = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("Fuel Station");
  console.log("Active Tab:", activeTab);
  // Separate states for fuel stations and dispensers
  const [fuelStations, setFuelStations] = useState([]);
  const [dispensers, setDispensers] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Separate pagination states
  const [fuelCurrentPage, setFuelCurrentPage] = useState(1);
  const [dispensersCurrentPage, setDispensersCurrentPage] = useState(1);
  const [fuelTotalPages, setFuelTotalPages] = useState(0);
  const [dispensersTotalPages, setDispensersTotalPages] = useState(0);
  
  // Separate query states
  const [lastFuelQuery, setLastFuelQuery] = useState("default");
  const [lastDispensersQuery, setLastDispensersQuery] = useState("default");
  
  const [loading, setLoading] = useState(false);
  const pageSize = 10;

  const handleSearch = async ({ query, tab, radius, page = 1 }) => {
    setHasSearched(true);
    try {
      setLoading(true);
      let url;
      
      if (tab === "Fuel Station") {
        url = `https://demo.skyhitmedia.website/petrol-stations/search?query=${encodeURIComponent(
          query
        )}`;
        url += `&page=${page}&pageSize=${pageSize}`;
        url += `&tenant=${config.tenant}`;
        
        if (radius) {
          url += `&radius=${radius}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch petrol stations");
        }
        const data = await response.json();
        setFuelStations(data.data);
        setFuelTotalPages(Math.ceil(data.pagination.total / pageSize));
        setFuelCurrentPage(page);
        setLastFuelQuery(query);
      } 
      else if (tab === "dispensers") {
        url = `https://demo.skyhitmedia.website/dispensers/search?query=${encodeURIComponent(
          query
        )}`;
        url += `&page=${page}&pageSize=${pageSize}`;
        url += `&tenant=${config.tenant}`;
        
        if (radius) {
          url += `&radius=${radius}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch dispensers");
        }
        const data = await response.json();
        setDispensers(data.data);
        setDispensersTotalPages(Math.ceil(data.pagination.total / pageSize));
        setDispensersCurrentPage(page);
        setLastDispensersQuery(query);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (!hasSearched) return;
  
  if (activeTab === "Fuel Station") {
    handleSearch({ query: lastFuelQuery, tab: "Fuel Station", page: 1 });
  } else if (activeTab === "dispensers") {
    handleSearch({ query: lastDispensersQuery, tab: "dispensers", page: 1 });
  }
}, [activeTab]);

  const handlePageChange = (page) => {
    if (activeTab === "Fuel Station") {
      if (page < 1 || page > fuelTotalPages) return;
      handleSearch({ 
        query: lastFuelQuery, 
        tab: "Fuel Station", 
        page,
        radius: null // Add radius if needed
      });
    } else {
      if (page < 1 || page > dispensersTotalPages) return;
      handleSearch({ 
        query: lastDispensersQuery, 
        tab: "dispensers", 
        page,
        radius: null // Add radius if needed
      });
    }
  };

  // Determine current data based on active tab
  const currentData = activeTab === "Fuel Station" ? fuelStations : dispensers;
  const currentQuery = activeTab === "Fuel Station" ? lastFuelQuery : lastDispensersQuery;
  const currentTotalPages = activeTab === "Fuel Station" ? fuelTotalPages : dispensersTotalPages;
  const currentPage = activeTab === "Fuel Station" ? fuelCurrentPage : dispensersCurrentPage;

  return (
    <div className="mx-auto">
      <div className="text-2xl font-bold mb-4 ml-4 lg:ml-20 p-4">
        <img
          src={config.logo}
          alt={`${config.name} Logo`}
          className="h-16 w-auto mr-2"
        />
      </div>
      <div className="bg-custom-gradient">
        <div className=" mx-auto max-w-6xl flex flex-col md:flex-row w-full h-ful p-4 gap-4">
          <div className="w-full md:w-1/3 bg-white flex items-start rounded-2xl p-4">
            <SearchCard
              onSearch={({ query, radius }) => handleSearch({ query, tab: activeTab, radius, page: 1 })}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          <div className="w-full md:w-2/3 flex justify-center items-center rounded-md">
            <Swiper
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Page, Navigation]}
              spaceBetween={30}
              centeredSlides={true}
              className="mySwiper"
              pagination={{
                clickable: true,
              }}
              navigation={false}
            >
              {config?.banners.map((img, i) => (
                <SwiperSlide key={i}>
                  <img src={img} alt={`Slide ${i + "1"}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-8">
          {currentData?.length > 0 && (
            <h4 className="text-center text-3xl font-medium">
              {currentQuery === "default" ? (
                activeTab === "Fuel Station"
                  ? "Available Petrol Stations"
                  : "Available Dispensers"
              ) : (
                <>
                  {activeTab === "Fuel Station" ? config.name + " Fuel Stations" : "Dispensers"} in{" "}
                  <span className={config?.tenant === 'hpdef' ? 'text-hpdefSecondary' : 'text-ioclSecondary'}>
                    {currentQuery}
                  </span>
                </>
              )}
            </h4>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 px-4">
            {currentData?.map((item) => (
              activeTab === "Fuel Station" ? 
                <StationCard key={item.id} station={item} /> :
                <DispenserCard key={item.id} dispenser={item} />
            ))}
          </div>
        </div>
      )}
      
      {currentData?.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={currentTotalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };
console.log('config', config, 'favicon', config.favicon);
  return (
    <>
      <Helmet>
        <title>{config?.title}</title>
        <meta
          name="description"
          content={config?.metaDescription}
        />
        <meta
          name="keywords"
          content={config?.metaKeywords}
        />
         <link rel="shortcut icon" type="image/png" href={config.favicon} />
      </Helmet>

      <div className="relative min-h-screen flex flex-col">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<PetrolStationFinder />} />
            <Route
              path="/login"
              element={
                loggedIn ? (
                  <Navigate to="/add" />
                ) : (
                  <LoginPage onLogin={handleLoginSuccess} />
                )
              }
            />
            <Route
              path="/add"
              element={
                loggedIn ? (
                  <>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-red-600 absolute right-20 m-5"
                    >
                      Logout
                    </button>
                    <AddPetrolStation loggedIn={loggedIn} />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
        <footer className="w-full text-center p-4 text-sm text-black bg-gray-100">
          &copy; {new Date().getFullYear()} {config?.footerName}. All rights
          reserved. Designed and Maintained by{" "}
          <span className="font-semibold"><Link to="https://skyhitmedia.com/">SKYHIT MEDIA.</Link></span>
        </footer>
      </div>
    </>
  );
};

export default App;