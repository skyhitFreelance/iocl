import { useState } from "react";

const AddPetrolStation = ({ loggedIn }) => {
  const [formData, setFormData] = useState({
    do_name: "",
    fo_name: "",
    fo_email: "",
    fo_mobile: "",
    ro_code: "",
    sa_name: "",
    ro_name: "",
    ssr: "",
    district: "",
    address: "",
    pin_code: "",
    latitude: "",
    longitude: "",
    pan_number: "",
    gstin: "",
    ro_email: "",
    mobile_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("api/petrol-stations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add petrol station");
      }

      const data = await response.json();
      alert(data.message);
      setFormData({
        do_name: "",
        fo_name: "",
        fo_email: "",
        fo_mobile: "",
        ro_code: "",
        sa_name: "",
        ro_name: "",
        ssr: "",
        district: "",
        address: "",
        pin_code: "",
        latitude: "",
        longitude: "",
        pan_number: "",
        gstin: "",
        ro_email: "",
        mobile_number: "",
      });
    } catch (error) {
      console.error("Error adding petrol station:", error);
      alert("Error adding petrol station");
    }
  };

  if (!loggedIn) {
    return <p className="text-red-500">Please log in to access this form.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Petrol Station</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {Object.keys(formData).map((key) => (
          <div className="mb-4" key={key}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
              {key.replace(/_/g, " ").toUpperCase()}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Add Petrol Station
        </button>
      </form>
    </div>
  );
};

export default AddPetrolStation;