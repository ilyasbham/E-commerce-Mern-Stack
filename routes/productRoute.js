const expree = require('express');
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetail } = require('../controllers/productController');

const router =  expree.Router();


router.route("/product/new").post(createProduct)

router.route("/products").get(getAllProduct)

router.route("/product/:id").put(updateProduct)

router.route("/product/:id").delete(deleteProduct)

router.route("/product/:id").get(getProductDetail)


module.exports= router;