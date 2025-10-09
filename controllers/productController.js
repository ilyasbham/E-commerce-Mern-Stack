const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management (CRUD operations)
 */

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15
 *               price:
 *                 type: number
 *                 example: 999
 *               description:
 *                 type: string
 *                 example: Latest Apple iPhone with A17 chip
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request or invalid data
 *
 *   get:
 *     summary: Get all products with pagination, search, and filters
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search keyword
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: Products fetched successfully
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get product details by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 *
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15 Pro
 *               price:
 *                 type: number
 *                 example: 1099
 *               description:
 *                 type: string
 *                 example: Updated model with titanium frame
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *
 *   delete:
 *     summary: Delete product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */

// Create Product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user?.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: `Product ${product.name} created successfully`,
    product,
  });
});

// Get All Products
exports.getAllProduct = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    message: "Fetched successfully",
    count: products.length,
    products,
  });
});

// Get Product Detail
exports.getProductDetail = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: `${product.name} deleted successfully`,
  });
});



//create New review or Update the review
exports.createProductReview = catchAsyncErrors(async (req,res,next)  => {

  //Destructure
  const {rating,comment,productId} = req.body;

  const review = {
    user : req.user._id,
    name : req.user.name,
    rating : Number(rating),
    comment,
};

const product = await Product.findById(productId);;

//rev is review yk element
const isReviewed = product.reviews.find (
  (rev) => rev.user.toString()===req.user._id.toString()
);

if(isReviewed) {
product.reviews.forEach((rev) => {
  if (rev.user.toString() === req.user._id.toString())
  (rev.rating = rating), (rev.comment = comment);
});
}
else {
  product.reviews.push(review);
  product.numOfReviews = product.reviews.length;

}

let avg = 0;

product.ratings = 
        product.reviews.forEach((rev)=>{
          avg += rev.rating;
        }) / product.reviews.length;

await product.save({validateBeforeSave : false});

res.status(200).json({
  success:true,
})

})