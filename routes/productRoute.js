const express = require("express");
const {
  createProduct,
  getAllProduct,
  getProductDetail,
  updateProduct,
  deleteProduct,
  createProductReview,
  getAllProductReviews,
  deleteProductReview,
} = require("../controllers/productController");
const {isAuthenticatedUser,authorizeRoles}= require("../middleware/auth")


const router = express.Router();

router.route("/products").get(getAllProduct);

router
    .route("/admin/product/new")
    .post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

router
  .route("/admin/products/:id")

  .put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)

  .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);

router.route("/product/:id").get(getProductDetail);

router.route("/review").put(isAuthenticatedUser,createProductReview);

router.route("/reviews").get(getAllProductReviews).delete(isAuthenticatedUser,deleteProductReview);



module.exports = router;