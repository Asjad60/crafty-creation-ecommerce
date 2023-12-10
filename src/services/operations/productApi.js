import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { categoryEndpoints, productEndpoints } from "../apis";

const { GET_CATEGORIES_API } = categoryEndpoints;
const {
  EDIT_PRODUCT_API,
  ADD_PRODUCT_API,
  GET_SUPPLIER_PRODUCTS,
  DELETE_PRODUCT_API,
  GET_FULL_PRODUCT_DETAILS_API,
  ADD_SECTION_API,
  EDIT_SECTION_API,
  DELETE_SECTION_API,
  ADD_SUBSECTION_API,
  DELETE_SUBSECTION_API,
  EDIT_SUBSECTION_API,
} = productEndpoints;

export const getCategories = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_CATEGORIES_API);

    // console.log("response from category ===> ", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("Get categories error", error);
    toast.error("Error Fetching Categories");
  }
  return result;
};

export const editProductDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", EDIT_PRODUCT_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.messasge);
    }

    toast.success("Product Details Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("editProductDetails", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const addProductDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", ADD_PRODUCT_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.messasge);
    }

    toast.success("Product Details Created Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("Create ProductDetails error", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getMyProducts = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_SUPPLIER_PRODUCTS, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("GET_SUPPLIER_PRODUCTS ERROR ===> ", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteProduct = async (productId, token) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_PRODUCT_API,
      productId,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("DELETE COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    toast.success("Product Deleted");
  } catch (error) {
    console.log("DELETE_PRODUCT_API ERROR ===> ", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
};

export async function getFullProductDetails(productId) {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", GET_FULL_PRODUCT_DETAILS_API, {
      productId,
    });

    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("GET_FULL_PRODUCT_DETAILS_API ERROR ===> ", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
}

export const createSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", ADD_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
    toast.success("Section Added");
  } catch (error) {
    console.log("ADD_SECTION_API ERROR ===> ", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const editSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", EDIT_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("ADD_SECTION_API ERROR ===> ", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("DELETE", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE_SECTION_API ERROR ===> ", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const CreateSubSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", ADD_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("ADD_SUBSECTION_API ERROR ===> ", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSubSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("DELETE", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE_SECTION_API ERROR ===> ", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const editSubSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", EDIT_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
    toast.success("Details Updated");
  } catch (error) {
    console.log("EDIT_SUBSECTION_API ERROR ===> ", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
