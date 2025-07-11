import React, { useState } from "react"; // Import React and useState
import { useContext } from "react"; // Import useContext hook
import { useEffect } from "react"; // Import useEffect hook
import { DoctorContext } from "../../context/DoctorContext"; // Import DoctorContext for doctor state
import { AppContext } from "../../context/AppContext"; // Import AppContext for utilities
import axios from "axios"; // Import axios for HTTP requests
import { toast } from "react-toastify"; // Import toast for notifications

// DoctorProfile component: Displays and allows editing of doctor's profile
const DoctorProfile = () => {
  // Destructure doctor context values
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  // Destructure currency from app context
  const { currency } = useContext(AppContext);

  // isEdit: State to toggle edit mode
  const [isEdit, setIsEdit] = useState(false);

  // updateProfile: Handles profile update request
  const updateProfile = async () => {
    try {
      // Prepare update data
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };
      // Send POST request to update profile
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message); // Show success toast
        setIsEdit(false); // Exit edit mode
        getProfileData(); // Refresh profile data
      } else {
        toast.error(data.message); // Show error toast
      }
    } catch (error) {
      toast.error(error.message); // Show error toast
      console.log(error); // Log error
    }
  };

  // useEffect: Fetch profile data when dToken changes
  useEffect(() => {
    if (dToken) {
      getProfileData(); // Fetch profile data if doctor token exists
    }
  }, [dToken]);

  // Render profile only if profileData exists
  return (
    profileData && (
      <div>
        {/* Main container */}
        <div className="flex flex-col gap-4 m-5">
          {/* Doctor image */}
          <div>
            <img
              className="bg-[#5f6FFF]/80 w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>
          {/* Profile info card */}
          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/* ------ Doc Info : name, degree, experience ----- */}
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {profileData.experience}
              </button>
            </div>
            {/* ------ Doc About ----- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>
            {/* Appointment fee (editable) */}
            <p className="text-gray-600 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-800">
                {currency}{" "}
                {isEdit ? (
                  <input
                    type="number"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={profileData.fees}
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>
            {/* Address (editable) */}
            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={profileData.address.line1}
                  />
                ) : (
                  profileData.address.line1
                )}
                <br />
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={profileData.address.line2}
                  />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>
            {/* Availability toggle (editable) */}
            <div className="flex gap-1 pt-2">
              <input
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profileData.available}
                type="checkbox"
                name=""
                id="ava"
              />
              <label htmlFor="ava">Available</label>
            </div>
            {/* Edit/Save button */}
            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-4 py-1 border border-[#5f6FFF] text-sm rounded-full mt-5 hover:bg-[#5f6FFF] hover:text-white transition-all"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-1 border border-[#5f6FFF] text-sm rounded-full mt-5 hover:bg-[#5f6FFF] hover:text-white transition-all"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile; // Export the DoctorProfile component
