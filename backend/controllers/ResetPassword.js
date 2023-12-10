const mailSender = require("../utils/mailSender");
const UserModel = require("../model/User");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `This Email ${email} is not Registered With Us Enter a Valid Email`,
      });
    }

    const token = crypto.randomBytes(20).toString("hex");

    const updatedDetails = await UserModel.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    );

    const url = `http://localhost:3000/update-password/${token}`;

    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );

    res.status(200).json({
      success: true,
      message: "Email Sent Successfully Please Check Your Email",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Some Error on Sending The Reset Message",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password and ConfirmPassowrd Not Matching",
      });
    }

    const userDetails = await UserModel.findOne({ token: token });
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is Invalid",
      });
    }

    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      });
    }

    const encyptedPassword = await bcrypt.hash(password, 10);

    await UserModel.findOneAndUpdate(
      { token: token },
      { password: encyptedPassword },
      { new: true }
    );

    res.json({
      success: true,
      message: `Password Reset Successful`,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: error.message,
      success: false,
      message: "Some Error in Updating the Password",
    });
  }
};
