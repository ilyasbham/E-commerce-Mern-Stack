const expree = require('express');
const { getAllProduct, createProduct } = require('../controllers/productController');

const router =  expree.Router();


router.route("/product/new").post(createProduct)

router.route("/products").get(getAllProduct)

module.exports= router;