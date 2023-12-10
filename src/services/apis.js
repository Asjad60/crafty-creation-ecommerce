const BASE_URL = process.env.REACT_APP_BASE_URL;

export const allProductData = {
  GET_PRODUCT_API: BASE_URL + "/getproduct",
};

export const catalogData = {
  CATALOG_PAGE_DATA_API: BASE_URL + "/getCategoryPageDetails",
};

export const contact = {
  CONTACT_API: BASE_URL + "/contact",
};

export const loginUser = {
  LOGIN_API: BASE_URL + "/login",
  SENDOTP_API: BASE_URL + "/sendotp",
  SIGNUP_API: BASE_URL + "/signup",
  RESET_PASS_TOKEN: BASE_URL + "/reset-password-token",
  RESET_PASSWORD: BASE_URL + "/reset-password",
};

export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/getUserDetails",
  GET_ENROLLED_ORDERS: BASE_URL + "/getMyOrders",
};

export const settingEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/updateProfilePicture",
  UPDATE_PROFILE_API: BASE_URL + "/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/changePassword",
  DELETE_ACCOUNT_API: BASE_URL + "/deleteAccount",
};

export const productEndpoints = {
  EDIT_PRODUCT_API: BASE_URL + "/editProduct",
  ADD_PRODUCT_API: BASE_URL + "/addProduct",
  GET_SUPPLIER_PRODUCTS: BASE_URL + "/getSupplierProducts",
  DELETE_PRODUCT_API: BASE_URL + "/deleteProduct",
  GET_FULL_PRODUCT_DETAILS_API: BASE_URL + "/getFullProductDetails",
  ADD_SECTION_API: BASE_URL + "/createSection",
  EDIT_SECTION_API: BASE_URL + "/editSection",
  DELETE_SECTION_API: BASE_URL + "/deleteSection",
  ADD_SUBSECTION_API: BASE_URL + "/createSubSection",
  DELETE_SUBSECTION_API: BASE_URL + "/deleteSubSection",
  EDIT_SUBSECTION_API: BASE_URL + "/editSubSection",
};

export const categoryEndpoints = {
  GET_CATEGORIES_API: BASE_URL + "/getAllCategory",
};

export const paymentEndpoints = {
  CAPTURE_PAYMENT_API: BASE_URL + "/capturePayment",
  VERIFY_PAYMENT_API: BASE_URL + "/verifyPayment",
};
