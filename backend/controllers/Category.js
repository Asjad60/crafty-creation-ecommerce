const Category = require("../model/Category");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return (
        res.status(400),
        json({
          success: false,
          message: "Please Enter Category",
        })
      );
    }

    const categoryDetails = await Category.create({
      name,
      description,
    });

    console.log("Create categoryDetails =====> ", categoryDetails);
    return res.status(200).json({
      success: true,
      message: "Category Created Successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const allCategory = await Category.find(
      {},
      { name: true, description: true }
    );
    return res.status(200).json({
      success: true,
      data: allCategory,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    console.log("consoling CategoryId ===> ", categoryId);

    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "products",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec();

    console.log("SELECTED COURSE", selectedCategory);
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    }

    if (selectedCategory.products.length === 0) {
      console.log("No Products found for the selected category.");
      return res.status(404).json({
        success: false,
        message: "No Products found for the selected category.",
      });
    }

    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });

    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "products",
        match: { status: "Published" },
        populate: {
          path: "ratingAndReviews",
        },
      })
      .exec();

    // TODO top Selling Products
    const allCategories = await Category.find({})
      .populate({
        path: "products",
        match: { status: "Published" },
        populate: {
          path: "ratingAndReviews",
        },
      })
      .exec();
    const allProducts = allCategories.flatMap((category) => category.products);
    const mostSellingProducts = allProducts
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingProducts,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
