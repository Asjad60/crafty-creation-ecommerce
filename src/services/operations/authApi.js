import { toast } from "react-hot-toast";
import { setToken, setLoading } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { loginUser } from "../apis";
import { apiConnector } from "../apiconnector";

const { SENDOTP_API, LOGIN_API, SIGNUP_API, RESET_PASSWORD, RESET_PASS_TOKEN } =
  loginUser;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      console.log("response from send otp api", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    toast.dismiss(toastId);
  };
}

export const signup = (name, email, password, accountType, otp, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading....");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        name,
        email,
        password,
        accountType,
        otp,
      });
      console.log("response from signup api", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("User Created");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Invalid OTP");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE............", response.data);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Logged In");
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.name}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export const resetPassToken = (email, setEmailSent) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading....");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESET_PASS_TOKEN, {
        email,
      });
      console.log("reset pass token rsponsae====", response);

      if (!response.data.success) {
        throw new Error(response.data.success);
      }

      toast.success("Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.log("RESETPASSTOKEN ERROR............", error);
      toast.error("Failed To Send Reset Email");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};

export const resetPassword = (password, confirmPassword, navigate, token) => {
  return async (dispatch) => {
    const toastid = toast.loading("Loading....");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESET_PASSWORD, {
        password,
        confirmPassword,
        token,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Password Reset Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Reset Password");
    }
    toast.dismiss(toastid);
    dispatch(setLoading(false));
  };
};

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/login");
  };
}
