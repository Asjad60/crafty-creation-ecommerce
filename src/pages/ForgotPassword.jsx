import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { resetPassToken } from "../services/operations/authApi";

function ForgotPassword() {
  const dispatch = useDispatch();
  const [emailSent, setEmailSent] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");

  const emailSendHandler = (e) => {
    e.preventDefault();

    dispatch(resetPassToken(email, setEmailSent));
  };

  return (
    <div className="grid min-h-[calc(100vh-3.6rem)] place-items-center">
      {loading ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 text-white max-w-[450px] p-3">
          <h1 className="text-[1.87rem] font-semibold leading-[2.375rem]">
            {!emailSent ? "Reset Your Password" : "Check Email"}
          </h1>
          <p className="text-lg">
            {!emailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={emailSendHandler}>
            {!emailSent && (
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className=" w-full py-3 px-3 text-md outline-none bg-transparent form-style border-b border-b-white focus:border-b-blue-400 peer"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute text-[16px] left-2 bottom-3  transform origin-[0] peer-valid:-translate-y-9 peer-valid:text-xs peer-focus:-translate-y-9 transition-all duration-300 peer-focus:text-xs"
                >
                  Email Address
                </label>
              </div>
            )}
            <button className=" mt-6 py-2 w-full bg-yellow-400 rounded-md text-black text-lg font-medium">
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>
          <div>
            <Link to="/login" className="flex gap-2 items-center">
              <BiArrowBack />
              Back To Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
