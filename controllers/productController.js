const Product = require("../models/productModel")


exports.createProduct = async (req,res,next)=>{
       
    const product = await Product.create(req.body);


    res.status(201).json({
        success:true,
        product,
    })
}

exports.getAllProduct=(req,res)=>{
    res.status(200).json({
        success:true,
        message:"this route will show product"
    })
}