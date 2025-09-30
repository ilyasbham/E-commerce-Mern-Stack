const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


//Create product
exports.createProduct = catchAsyncErrors(async (req,res,next)=>{

    const product = await Product.create(req.body);


    res.status(201).json({
        success:true,
        product,
    })
});

//Get All Product
exports.getAllProduct= catchAsyncErrors(async (req,res)=>{
    const products = await Product.find();
    res.status(200).json({
        success:true,
        message:"fetch succesfully",
        products,
    })
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
exports.deleteProduct = catchAsyncErrors(async (req,res,next)=> {
    const product =await Product.findById(req.params.id);
  return next(new ErrorHandler("Product Not Found",404));``
    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"product deleted"
    })
});