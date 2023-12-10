const express = require("express");
const router = express.Router();

const {
  getProductDetails,
  editProduct,
  addProducts,
  getSupplierProducts,
  deleteProducts,
} = require("../controllers/Product");

const {
  createSection,
  editSection,
  deleteSection,
} = require("../controllers/Section");

const {
  createSubSection,
  deleteSubSection,
  editSubSection,
} = require("../controllers/SubSection");

const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");

const {
  getAllCategories,
  categoryPageDetails,
  createCategory,
} = require("../controllers/Category");
const { auth, isAdmin, isSupplier, isVisitor } = require("../middlewares/auth");

// Products
router.post("/addProduct", auth, isSupplier, addProducts);
router.post("/editProduct", auth, isSupplier, editProduct);
router.get("/getSupplierProducts", auth, isSupplier, getSupplierProducts);
router.post("/getFullProductDetails", getProductDetails);
router.delete("/deleteProduct", auth, deleteProducts);

// Sections
router.post("/createSection", auth, isSupplier, createSection);
router.post("/editSection", auth, isSupplier, editSection);
router.delete("/deleteSection", auth, isSupplier, deleteSection);

//SubSection
router.post("/createSubSection", auth, isSupplier, createSubSection);
router.post("/editSubSection", auth, isSupplier, editSubSection);
router.delete("/deleteSubSection", auth, isSupplier, deleteSubSection);

// Categories
router.post("/createCategory", auth, isAdmin, createCategory);
router.post("/getCategoryPageDetails", categoryPageDetails);
router.get("/getAllCategory", getAllCategories);

//RatingAndReview
router.post("/createRating", auth, isVisitor, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getAllRating", getAllRating);

module.exports = router;
