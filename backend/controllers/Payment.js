const mongoose = require("mongoose");
const { instance } = require("../config/razorpay");
const UserModel = require("../model/User");
const Product = require("../model/Product");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");

exports.capturePayment = async (req, res) => {
  const { products } = req.body;
  console.log("products ====> ", products);

  if (products.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please Provide valid Product Ids",
    });
  }

  let totalAmount = 0;
  for (const productId of products) {
    let product;
    try {
      product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Could not find the Product" });
      }
      totalAmount += product.price;
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    console.log("console.log(paymentResponse) ====> ", paymentResponse);
    return res.status(200).json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Could not initiate order." });
  }
};

exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const products = req.body?.products;
  const userId = req.user.id;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !products ||
    !userId
  ) {
    return res.status(400).json({
      success: false,
      message: "Payment Failed",
    });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString().digest("hex"));

  if (expectedSignature === razorpay_signature) {
    await enrollBuyers(products, userId, res);

    return res.status(200).json({
      success: true,
      message: "Payment Verified",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Payment Failed",
  });
};

const enrollBuyers = async (products, userId, res) => {
  if (!products || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please Provide Data For Products ANd UserId",
    });
  }

  for (const productId of products) {
    const enrolledProducts = await Product.findByIdAndUpdate(
      { _id: productId },
      { $push: { buyer: userId } },
      { new: true }
    );

    if (!enrolledProducts) {
      return res.status(404).json({
        success: false,
        message: "Product NOt Found",
      });
    }

    const enrolledBuyers = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { products: productId } },
      { new: true }
    );
  }
};
