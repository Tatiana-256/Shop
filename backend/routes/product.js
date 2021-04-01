const express = require("express");

const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControler");

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleWares/authMdlWare");

// User routes
router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);

// Admin routes
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

module.exports = router;
