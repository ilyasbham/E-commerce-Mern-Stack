const express = require("express");
const {
  createProduct,
  getAllProduct,
  getProductDetail,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.route("/products").get(getAllProduct).post(createProduct);
router
  .route("/products/:id")
  .get(getProductDetail)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
