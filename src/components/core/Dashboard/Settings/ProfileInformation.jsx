import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from "../../../common/IconButton";
import { updatedProfile } from "../../../../services/operations/settingsAPI";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

const ProfileInformation = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    about: "",
  });

  useEffect(() => {
    setFormData({
      name: user?.name ? user?.name : "",
      dateOfBirth: user?.additionalDetails?.dateOfBirth
        ? user?.additionalDetails?.dateOfBirth
        : "",
      gender: user?.additionalDetails?.gender
        ? user?.additionalDetails?.gender
        : "",
      contactNumber: user?.additionalDetails?.contactNumber
        ? user?.additionalDetails?.contactNumbe
        : "",
      about: user?.additionalDetails?.about
        ? user?.additionalDetails?.about
        : "",
    });
  }, [user]);

  const handleFormData = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(formData.gender);
    console.log(formData.name);
  };

  const { name, dateOfBirth, gender, contactNumber, about } = formData;

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    try {
      dispatch(
        updatedProfile(token, name, dateOfBirth, gender, contactNumber, about)
      );
    } catch (error) {
      console.log("error in Update Profile Details", error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleUpdateProfile} className="flex flex-col gap-y-6">
        <div className="bg-[#161d29] p-10 flex gap-6 flex-col mt-10 rounded-lg text-white">
          <h1 className="text-xl font-medium">Profile Information</h1>
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="px-4 py-3 w-full rounded-md bg-[#2C333F] border-b border-b-[#445866] outline-none"
              onChange={handleFormData}
              defaultValue={user?.name}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-y-6 gap-x-6">
            <div className="flex flex-col w-full">
              <label htmlFor="DOB" className="mb-1 font-medium">
                Date Of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="DOB"
                onChange={handleFormData}
                className="rounded-md bg-[#2C333F] w-full border-b border-b-[#445866]  py-3 px-4"
                defaultValue={user?.additionalDetails?.dateOfBirth}
                required
              />
            </div>
            <div className="flex flex-col  w-full">
              <label htmlFor="gender" className="mb-1 font-medium">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                onChange={handleFormData}
                className=" bg-[#2C333F] rounded-md border-b border-b-[#445866] w-full py-3 px-4 outline-none"
                value={user?.additionalDetails?.gender || ""}
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-y-6 gap-x-6 w-full">
            <div className="flex flex-col w-full">
              <label htmlFor="contactNumber" className="mb-1 font-medium">
                Contact Number
              </label>
              <input
                type="text"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                onChange={handleFormData}
                maxLength={12}
                minLength={10}
                className=" bg-[#2C333F] rounded-md border-b border-b-[#445866] w-full py-3 px-4"
                defaultValue={user?.additionalDetails?.contactNumber}
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="about" className="mb-1 font-medium">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                onChange={handleFormData}
                className=" bg-[#2C333F] rounded-md border-b border-b-[#445866] w-full py-3 px-4"
                defaultValue={user?.additionalDetails?.about}
                required
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end gap-x-4 mt-3">
          <button
            onClick={() => navigate("/dashboard/my-profile")}
            className="text-white bg-[#2C333F] py-2 px-4 rounded-md"
          >
            Cancel
          </button>

          <IconButton type="submit" text="Save" />
        </div>
      </form>
    </>
  );
};

export default ProfileInformation;
