import { toast } from "react-hot-toast";
import { logout } from "./authApi";
import { apiConnector } from "../apiconnector";
import { setLoading, setUser } from "../../slices/profileSlice";
import { profileEndpoints } from "../apis";

const { GET_USER_DETAILS_API, GET_ENROLLED_ORDERS } = profileEndpoints;

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });
      // console.log("GET_USER_DETAILS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response?.data?.data?.image
        ? response?.data?.data?.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.name} `;
      dispatch(setUser({ ...response?.data?.data, image: userImage }));
    } catch (error) {
      dispatch(logout(navigate));
      console.log("GET_USER_DETAILS API ERROR............", error);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export const getMyEnrolledOrders = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ENROLLED_ORDERS, null, {
      Authorization: `Bearer ${token}`,
    });
    // console.log("getMyEnrolledOrders ======> ", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data.data;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not Get Enrolled Orders");
  }
  toast.dismiss(toastId);
  return result;
};
