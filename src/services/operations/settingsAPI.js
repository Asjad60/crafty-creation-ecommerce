import { toast } from "react-hot-toast";
import { settingEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";
import { logout } from "./authApi";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_ACCOUNT_API,
} = settingEndpoints;

export const updateProfilePicture = (token, formData) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "mutipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Profile Updated");
      dispatch(setUser(response.data.data));
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      toast.error("Could Not Update Display Picture");
    }
    toast.dismiss(toastId);
  };
};

export const updatedProfile = (
  token,
  name,
  dateOfBirth,
  gender,
  contactNumber,
  about
) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_PROFILE_API,
        { name, dateOfBirth, gender, contactNumber, about },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      // console.log("UPDATE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Profile Details Updated");
    } catch (error) {
      toast.error("Faild TO Update Details");
    }

    toast.dismiss(toastId);
  };
};

export const changePassword = (token, formData) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "PUT",
        CHANGE_PASSWORD_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      // console.log("UPDATE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Password Changed");
    } catch (error) {
      toast.error("Faild TO Update Details");
    }
    toast.dismiss(toastId);
  };
};

export const deleteAccount = (token, navigate) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector("DELETE", DELETE_ACCOUNT_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(resetCart());
      toast.success("Account Deleted");
      navigate("/signup");
      dispatch(logout(navigate));
    } catch (error) {
      console.log("Delete Account Error ==> ", error);
      toast.error(error.response.data.message);
    }
  };
};
