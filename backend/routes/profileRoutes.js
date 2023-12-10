const express = require("express");
const router = express.Router();

const {
  getAllUserDetails,
  updateProfilePicture,
  updateProfile,
  getMyOrders,
  deleteAccount,
} = require("../controllers/profile");
const { auth } = require("../middlewares/auth");

router.get("/getUserDetails", auth, getAllUserDetails);
router.put("/updateProfilePicture", auth, updateProfilePicture);
router.put("/updateProfile", auth, updateProfile);
router.get("/getMyOrders", auth, getMyOrders);
router.delete("/deleteAccount", auth, deleteAccount);

module.exports = router;
