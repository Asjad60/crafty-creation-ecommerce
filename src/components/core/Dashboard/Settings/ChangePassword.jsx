import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from "../../../common/IconButton";
import { changePassword } from "../../../../services/operations/settingsAPI";

const ChangePassword = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChangePassword = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    dispatch(changePassword(token, formData));
    setFormData({
      currentPassword: "",
      newPassword: "",
    });
  };
  return (
    <>
      <form onSubmit={handleSubmitPassword}>
        <div className="bg-[#161d29] p-10 rounded-lg mt-10 text-white flex gap-5 flex-col">
          <h2 className="text-xl font-medium ">Change Password</h2>
          <div className="flex flex-col md:flex-row  gap-4 justify-between">
            <div className="relative flex flex-col justify-between w-full">
              <label htmlFor="currentPassword" className="mb-1">
                Current Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="currentPassword"
                id="currentPassword"
                value={formData.currentPassword}
                onChange={handleChangePassword}
                className="relative bg-[#2C333F] p-3 rounded-lg outline-none border-b border-b-[#445866]"
              />
              <span
                className="absolute right-2 bottom-3 text-xl cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            <div className="relative flex flex-col justify-between w-full">
              <label htmlFor="newPassword" className="mb-1">
                New Password
              </label>
              <input
                type={confirmShowPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                value={formData.newPassword}
                onChange={handleChangePassword}
                className="relative bg-[#2C333F] p-3 rounded-lg outline-none border-b border-b-[#445866]"
              />
              <span
                onClick={() => setConfirmShowPassword(!confirmShowPassword)}
                className="absolute right-2 bottom-3 text-xl cursor-pointer"
              >
                {confirmShowPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6 gap-4">
          <button
            type="submit"
            onClick={() => navigate("/dashboard/my-profile")}
            className="text-white bg-[#2C333F] py-2 px-4 rounded-md"
          >
            Cancel
          </button>
          <IconButton text="Update" type="submit" />
        </div>
      </form>
    </>
  );
};

export default ChangePassword;
