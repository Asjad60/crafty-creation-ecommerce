const RatingAndReview = require("../model/RatingAndReview");
const Product = require("../model/Product");
const mongoose = require("mongoose");

exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;

    const { rating, review, productId } = req.body;

    const productDetails = await Product.findOne({
      _id: productId,
      buyer: { $elemMatch: { $eq: userId } },
    });
    if (!productDetails) {
      return res.status(404).json({
        success: false,
        message: "Buy First",
      });
    }

    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      product: productId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "User Already Reviewed",
      });
    }

    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      user: userId,
      product: productId,
    });

    const updatedProductDetails = await Product.findByIdAndUpdate(
      { _id: productId },
      {
        $push: { ratingAndReviews: ratingReview._id },
      },
      { new: true }
    );

    console.log("updatedProductDetails --------> ", updatedProductDetails);

    return res.status(200).json({
      success: true,
      meassage: "Rating And Review Created Successfully",
      ratingReview,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const { productId } = req.body;

    const result = await RatingAndReview.aggregate([
      {
        $match: {
          product: new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    return res.status(200).json({
      success: true,
      message: "No Average Rating",
      averageRating: 0,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductRating = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId)
      .populate({
        path: "ratingAndReviews",
        poopulate: {
          path: "user",
          select: "name email image",
        },
      })
      .sort({ rating: "desc" });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//============== ALLRatingAndReviews =============
exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "name email image",
      })
      .populate({
        path: "product",
        select: "productName",
      })
      .exec();
    return res.status(200).json({
      success: true,
      message: "All reviews fetched Successfully",
      allReviews,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
