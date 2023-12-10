import React, { useEffect, useState } from "react";
import "./VerifyEmail.css";
import OtpInput from "react-otp-input";
import { useSelector, useDispatch } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signup } from "../../services/operations/authApi";
import { RxCounterClockwiseClock } from "react-icons/rx";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, signupData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const { name, email, password, accountType } = signupData;
    dispatch(signup(name, email, password, accountType, otp, navigate));
  };

  return (
    <div className="verifyEmail-container">
      {loading ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="verify_email">
          <h1>Verify Email</h1>
          <p>A verification code has been sent to you. Enter the code below</p>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="render-inputs pl-[5%]"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button type="submit" className="verify-btn">
              Verify Email
            </button>
          </form>
          <div className="back-and-resend-btn">
            <Link to="/login">
              <p>
                <BiArrowBack
                  style={{ transform: "translateY(2px)", marginRight: "4px" }}
                />
                Back To Login
              </p>
            </Link>

            <button
              className="resend-btn"
              onClick={() => dispatch(sendOtp(signupData.email, navigate))}
            >
              <RxCounterClockwiseClock
                style={{ transform: "translateY(2px)", marginRight: "4px" }}
              />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
