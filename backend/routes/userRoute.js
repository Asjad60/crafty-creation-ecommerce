const express = require("express");
const router = express.Router();

const {
  login,
  signUp,
  sendotp,
  changePassword,
} = require("../controllers/Auth");

const {
  addProducts,
  ImageUpload,
  getAllProducts,
} = require("../controllers/Product");
const { auth, isVisitor, isAdmin } = require("../middlewares/auth");

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

router.post("/signup", signUp);
router.post("/login", login);
router.post("/imageupload", ImageUpload);
router.get("/getproduct", getAllProducts);
router.put("/changePassword", auth, changePassword);

//================Reset Password And Token===================
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

//======================SEND OTP =========================
router.post("/sendotp", sendotp);

router.get("/test", auth, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Protected route for test",
  });
});
router.get("/visitor", auth, isVisitor, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Visitor route",
  });
});
router.get("/admin", auth, isAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin route",
  });
});

module.exports = router;
