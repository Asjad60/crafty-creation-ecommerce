const { uploadFileToCloudinary } = require("../utils/imageUploader");
const Profile = require("../model/ProfileModel");
const UserModel = require("../model/User");
const Product = require("../model/Product");

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;

    const userDetails = await UserModel.findById(id)
      .populate("additionalDetails")
      .select("-password")
      .exec();
    console.log(userDetails);
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Fetching Profile Details Failed",
    });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    const pic = req.files.pic;
    const userId = req.user.id;

    const image = await uploadFileToCloudinary(
      pic,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log(image.secure_url);
    const updatedProfile = await UserModel.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    // res.status(200).json({
    //   success: true,
    //   message: `Image Updated successfully`,
    //   data: updatedProfile,
    // });
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, dateOfBirth, about, contactNumber, gender } = req.body;

    const id = req.user.id;

    // if (!name || !dateOfBirth || !contactNumber || !about) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Fill The Details",
    //   });
    // }

    const userDetails = await UserModel.findById(id);
    const profile = await Profile.findById(userDetails.additionalDetails);

    const user = await UserModel.findByIdAndUpdate(id, name);

    await user.save();

    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;
    profile.gender = gender;

    await profile.save();

    const updatedUserDetails = await UserModel.findById(id)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Profile Updated",
      updatedUserDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Updating Profile Error",
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await UserModel.findById(id);
    await Profile.findByIdAndDelete(user.additionalDetails);

    for (const productId of user.products) {
      await Product.findByIdAndUpdate(
        productId,
        {
          $pull: { buyer: id },
        },
        { new: true }
      );
    }

    await UserModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Account Deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Delete Profile Error",
    });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await UserModel.findById({ _id: id })
      .populate("products")
      .exec();

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: `Could Not Find Data With User Id ${userDetails}`,
      });
    }

    console.log("My orders ====> ", userDetails);
    return res.status(200).json({
      success: true,
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
