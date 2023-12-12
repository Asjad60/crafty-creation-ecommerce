import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
// import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
// import { setToken } from "../../slices/authSlice";
// import { setUser } from "../../slices/profileSlice";
import "./Login.css";
import { login } from "../../services/operations/authApi";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
    // const toastId = toast.loading("Loading....");
    // let result = null;
    // try {
    //   let response = await fetch(loginUser.LOGIN_API, {
    //     method: "POST",
    //     body: JSON.stringify({
    //       email,
    //       password,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   result = await response.json();
    //   console.log(result.user);

    //   if (!result.success) {
    //     throw new Error(result.message);
    //   }
    //   toast.success("Logged IN");

    //   dispatch(setToken(result.user.token));

    //   const userImage = result?.user?.image
    //     ? result?.user?.image
    //     : `https://api.dicebear.com/5.x/initials/svg?seed=${result.user.name}`;

    //   dispatch(setUser({ ...result.user, image: userImage }));
    //   localStorage.setItem("token", JSON.stringify(result.user.token));
    //   // localStorage.setItem("user", JSON.stringify(result.user));
    // } catch (error) {
    //   toast.error(result.message);
    // }
    // toast.dismiss(toastId);
  };

  return (
    <>
      <div className="login-body">
        <form className="login-page py-6" onSubmit={loginHandler}>
          <div className="w-full">
            <h1 className="text-3xl font-medium">Welcome Back!</h1>
          </div>

          <div className="login-boxes">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email" className="">
              Email
            </label>
          </div>
          <div className="login-boxes">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
            <span
              className="eyebutton"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </span>
            <Link to="/forgot-password">
              <p>Forgot Password</p>
            </Link>
          </div>

          <div className="btn w-full">
            <button>Login</button>
          </div>

          <span className="span-signup">
            Don't have account? <Link to="/signup">SignUp</Link>
          </span>
        </form>
      </div>
    </>
  );
}
