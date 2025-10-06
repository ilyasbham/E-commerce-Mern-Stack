const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");


//Create product
exports.createProduct = catchAsyncErrors(async (req,res,next)=>{

    //value of req.user.id ka postman ka body ka lr ml aedr go save loke dr
    req.body.user = req.user.id;

    const product = await Product.create(req.body);


    res.status(201).json({
        success:true,
        message:`Product ${product.name} created successfully`,
        product



    })
    next();
});

//Get All Product
exports.getAllProduct = catchAsyncErrors(async (req, res) => {

const resultPerPage = 5;



    const apiFeatures = new ApiFeatures(Product.find(), req.query)
        .search()
          // chain search
        .filter()
        // chain filter
        .pagination(resultPerPage); // 10 products per page

    const products = await apiFeatures.query; // ✅ execute the mongoose query here

    res.status(200).json({
        success: true,
        message: "Fetch successfully",
        count: products.length,
        products,   // now it's plain documents
    });
});


//get product detail
exports.getProductDetail = catchAsyncErrors(async (req,res,next) =>{
    const product = await Product.findById(req.params.id);
    if(!product) {
    return next(new ErrorHandler("Product Not Found",404));
}
res.status(200).json({
    success:true,
    product
})
});


//Update Product
exports.updateProduct = catchAsyncErrors(async (req,res,next) =>{

    let product = await Product.findById(req.params.id);
if(!product) {
     return next(new ErrorHandler("Product Not Found",404));
}
product = await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false
});
res.status(200).json({
    success:true,
    product
})
});


//delete product
exports.deleteProduct = catchAsyncErrors(async (req,res,next) => {

    const product = await Product.findById(req.params.id);

    if(!product) {
         return next(new ErrorHandler("Product Not Found",404));
    }

    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:` ${product.name} deleted`
    })      
});

