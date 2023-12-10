const Product = require("../model/Product");
const Section = require("../model/Section");
const SubSection = require("../model/SubSection");

exports.createSection = async (req, res) => {
  try {
    const { sectionName, productId } = req.body;

    if (!sectionName || !productId) {
      return res.status(404).json({
        success: false,
        message: "Missing Properties",
        error: error.message,
      });
    }

    const createSection = new Section({ sectionName });
    await createSection.save();

    const productDetails = await Product.findByIdAndUpdate(
      productId,
      {
        $push: { productContent: createSection._id },
      },
      { new: true }
    )
      .populate({
        path: "productContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section Created",
      data: productDetails,
    });
  } catch (error) {
    console.log("Error At section Creating  ", error.message);
    return res.status(500).json({
      success: false,
      message: "Section Creation Failed",
      error: error.message,
    });
  }
};

exports.editSection = async (req, res) => {
  try {
    const { sectionName, sectionId, productId } = req.body;

    const section = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName: sectionName,
      },
      { new: true }
    );

    const product = await Product.findById(productId)
      .populate({
        path: "productContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section Updated",
      data: product,
    });
  } catch (error) {
    console.log("Error At section Updating  ", error.message);
    return res.status(500).json({
      success: false,
      message: "Section Editing Failed",
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, productId } = req.body;

    const section = await Section.findById(sectionId);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section Not Found",
        error: error.message,
      });
    }

    await SubSection.deleteMany({ _id: { $in: section.subSection } });

    await Section.findByIdAndDelete(sectionId);

    await Product.findByIdAndUpdate(
      productId,
      {
        $pull: { productContent: sectionId },
      },
      { new: true }
    );

    const product = await Product.findById(productId)
      .populate({
        path: "productContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      data: product,
      message: "Section Deleted",
    });
  } catch (error) {
    console.log("Error At section Deleting  ", error.message);
    return res.status(500).json({
      success: false,
      message: "Section Deletion Failed",
      error: error.message,
    });
  }
};
