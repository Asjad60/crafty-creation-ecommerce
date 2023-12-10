const UserModel = require("../model/User");
const OTP = require("../model/OTP");
const Profile = require("../model/ProfileModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
require("dotenv").config();

exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    const checkUserPresent = await UserModel.findOne({ email: email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already Exist",
      });
    }

    //generate OTP

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    //check unique otp or not
    const result = await OTP.findOne({ otp: otp });
    console.log("otp generated", otp);
    console.log("Result", result);
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    }

    const otpBody = await OTP.create({ email, otp });
    console.log("OTP Body", otpBody);
    return res.status(200).json({
      success: true,
      message: "OTP sent Successfully",
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.mesaage,
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    const { name, email, password, accountType, otp } = req.body;
    if (!name || !email || !password || !accountType || !otp) {
      return res.status(400).json({
        success: false,
        message: "Please fill The All Details",
      });
    }
    let existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        succes: false,
        message: "User Already Exist",
      });
    }

    // Finding the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log("recent OTP", response);

    if (response.length === 0) {
      return res.json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        succes: false,
        message: "Error Hashing Password",
        error: error,
      });
    }

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    let result = new UserModel({
      name,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
    });
    await result.save();
    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Some issues on Posting",
      error: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill The All Details",
      });
    }
    let user = await UserModel.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res.status(404).json({
        message: "User is Not Registered",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };

    try {
      if (await bcrypt.compare(password, user.password)) {
        console.log("compare block");
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });

        user.token = token;
        user.password = undefined;

        let options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        return res.cookie("token", token, options).status(200).json({
          success: true,
          user,
          token,
          mesaage: "User Login Success",
        });

        // return res.status(200).json({
        //     success: true,
        //     user,
        //     token,
        //     mesaage: "Data found Successfully"
        // })
      } else {
        return res.status(403).json({
          success: false,
          message: "Incorrect Password",
        });
      }
    } catch (error) {
      return res.status(400).json({
        error: error,
        message: error.message,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login Failure" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const id = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).jason({
        success: false,
        message: "Please Fill The Details",
      });
    }

    const user = await UserModel.findById(id);

    if (await bcrypt.compare(currentPassword, user.password)) {
      const encyptedPassword = await bcrypt.hash(newPassword, 10);
      const updatedPassword = await UserModel.findByIdAndUpdate(
        id,
        {
          password: encyptedPassword,
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Password Chanaged",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Enter Valid Old Password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Password Updation Failed",
    });
  }
};
