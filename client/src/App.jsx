/* eslint-disable react/prop-types */
import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaSuitcase } from "react-icons/fa";
import SearchCard from "./components/Search";
import LoginPage from "./components/Login";
import AddPetrolStation from "./components/AddPetrolStation";

const StationCard = ({ station }) => {
  console.log(station, "station");
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
      <h2 className="text-lg font-bold text-gray-800">IOCL</h2>
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
        {station.mobile ? (
          <a
            href={`tel:${station.mobile}`}
            className="bg-[#013d86] text-white py-1 px-4 rounded hover:bg-[#013d86]"
          >
            Call
          </a>
        ) : (
          <button
            className="bg-[#013d86] text-white py-1 px-4 rounded cursor-not-allowed"
            disabled
          >
            Call
          </button>
        )}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#f35e04] text-white py-1 px-4 rounded hover:bg-[#f35e04]"
        >
          Map
        </a>
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
  const [stations, setStations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Default page size
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [lastLat, setLastLat] = useState(null); // To store the last searched latitude
  const [lastLng, setLastLng] = useState(null); // To store the last searched longitude

  const handleSearch = async ({ lat, lng, page = 1 }) => {
    try {
      setLoading(true);
      let url = `api/petrol-stations/search?latitude=${lat}&longitude=${lng}`;
      url += `&page=${page}&pageSize=${pageSize}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch petrol stations");
      }
      const data = await response.json();
      setStations(data.data);
      setTotalPages(Math.ceil(data.pagination.total / pageSize));
      setLastLat(lat);
      setLastLng(lng);
    } catch (error) {
      console.error("Error fetching petrol stations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page); // Update the current page state
    if (lastLat && lastLng) {
      handleSearch({ lat: lastLat, lng: lastLng, page }); // Trigger search with the updated page
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Petrol Station Finder</h1>
      <SearchCard onSearch={(latLng) => handleSearch({ ...latLng, page: 1 })} />
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {stations.map((station) => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
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

  return (
    <div className="relative">
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
  );
};

export default App;
