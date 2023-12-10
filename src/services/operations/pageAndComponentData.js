import React from "react";
import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { catalogData } from "../apis";

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector(
      "POST",
      catalogData.CATALOG_PAGE_DATA_API,
      { categoryId: categoryId }
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    result = response?.data;
  } catch (error) {
    console.log("CATALOG PAGE DATA ERROR ====>", error);
    // toast.error(error.message);
    result = error.message;
  }
  toast.dismiss(toastId);
  return result;
};
