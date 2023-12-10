const jwt = require("jsonwebtoken");
const UserModel = require("../model/User");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  console.log("cookie", req.cookies.token);
  console.log("Body", req.body.token);
  console.log("header", req.header("Authorization"));

  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token Missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded jwt=====", decode);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Something went wrong, while verifying the token",
      error: error.message,
    });
  }
};

// Checking Visitor or Not

exports.isVisitor = async (req, res, next) => {
  try {
    const email = req.user.email;
    const userDetails = await UserModel.findOne({ email: email });
    if (userDetails.accountType !== "Visitor") {
      return res.status(401).json({
        success: false,
        message: "This is Protected Route For Visitors",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      messsage: "User AccountType not Matching in Visitor",
    });
  }
};

// Checking Admin or Not
exports.isAdmin = async (req, res, next) => {
  try {
    const email = req.user.email;
    const userDetails = await UserModel.findOne({ email: email });
    if (userDetails.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is Protected Route For Admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      messsage: "User AccountType is not Matching in Admin",
    });
  }
};

// Checking isSupplier or Not
exports.isSupplier = async (req, res, next) => {
  try {
    const email = req.user.email;
    const userDetails = await UserModel.findOne({ email: email });
    if (userDetails.accountType !== "Supplier") {
      return res.status(401).json({
        success: false,
        message: "This is Protected Route For Supplier",
      });
    }
    next();
  } catch (error) {
    console.log("Error in is Supplier ====> ", error.message);
    return res.status(500).json({
      success: false,
      messsage: "User AccountType is not Matching in Supplier",
    });
  }
};
