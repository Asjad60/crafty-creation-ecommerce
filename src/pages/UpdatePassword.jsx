import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { resetPassword } from "../services/operations/authApi";

function UpdatePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [cShowPassword, setCShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = formData;
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, navigate, token));
  };

  return (
    <div className="grid min-h-[93vh] place-items-center">
      {loading ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-7 max-w-[400px] p-4 lg:p-8">
          <h1 className="text-white text-3xl">Choose New Password</h1>
          <p className="text-white">
            Almost done. Enter your new password and youre all set.
          </p>

          <form className="flex flex-col gap-7" onSubmit={submitHandler}>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={handleChange}
                required
                className="text-white realtive w-full bg-transparent p-2 outline-none  form-style peer border-b border-b-gray-300"
              />
              <label
                htmlFor="password"
                className="text-white absolute left-2 top-2 peer-valid:-translate-y-7 peer-valid:text-xs peer-focus:-translate-y-7 transition-all duration-300  peer-focus:text-xs"
              >
                New Password
              </label>
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>
            <div className="relative">
              <input
                type={cShowPassword ? "text" : "password"}
                name="confirmPassword"
                id="cpassword"
                value={confirmPassword}
                onChange={handleChange}
                required
                className="text-white realtive w-full bg-transparent p-2 outline-none  form-style peer border-b border-b-gray-300"
              />
              <label
                htmlFor="cpassword"
                className="text-white absolute left-2 peer-valid:-translate-y-7 peer-valid:text-xs top-2 peer-focus:-translate-y-7 transition-all duration-300  peer-focus:text-xs"
              >
                Confirm New Password
              </label>
              <span
                onClick={() => setCShowPassword(!cShowPassword)}
                className="absolute top-2 right-2"
              >
                {" "}
                {cShowPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>
            <button className="w-full bg-yellow-400 py-2 text-lg font-medium rounded-md">
              Reset Password
            </button>
          </form>

          <div className="flex items-center justify-between">
            <Link to="/login">
              <p className="text-white flex items-center gap-x-2">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatePassword;
