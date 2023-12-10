const express = require("express");
const router = express.Router();

const { capturePayment, verifyPayment } = require("../controllers/Payment");
const { auth, isVisitor } = require("../middlewares/auth");

router.post("/capturePayment", auth, isVisitor, capturePayment);
router.post("/verifyPayment", auth, isVisitor, verifyPayment);

module.exports = router;
