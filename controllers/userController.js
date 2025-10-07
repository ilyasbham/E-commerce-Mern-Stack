const ErrorHandler=require("../utils/errorHandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const userModel=require("../models/userModel");
const sendToken=require("../utils/jwtToken");
const sendEmail=require("../utils/sendEmail.js");

//Register a user
exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password}=req.body;

    const user=await userModel.create({
        name,
        email,
        password,
        avatar:{
            public_id:"sample id",
            url:"sample url"
        }
    });
    sendToken(user,201,res);
    
        
    
});
//Login User
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    //extract email and password from req.body
    const {email,password}=req.body;

    //Check if user has given password and email
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",400));
    }

    //Finding user in database
    const user=await userModel.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));//401=unauthorized
    }

    //Checking password
    const isMatch=await user.comparePassword(password);

    if(!isMatch){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    sendToken(user,200,res);

  
});

//Logout user
exports.logout=catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"Logged out"
    });
});

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product
 *    tags: [Product]
 *    requestBody:
 *     required: true
 *    content:
 *     application/json:
 *      schema:
 *      $ref: '#/components/schemas/Product'
 *   responses:
 *    201:
 *    description: Product created successfully
 *  get:
 *   summary: Get all products
 *  tags: [Product]
 *  responses:
 *  200:
 *   description: List of products
 * /product/{id}:
 * get:
 *  summary: Get product details by ID
 * tags: [Product]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: Product ID
 * responses:
 * 200:
 *   description: Product details retrieved
 * 404:
 *   description: Product not found
 * put:
 * summary: Update product by ID
 * tags: [Product]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: Product ID
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Product'
 * responses:
 * 200:
 * description: Product updated successfully
 * 404:
 * description: Product not found
 */
//Delete Product
exports.deleteProduct = catchAsyncErrors(async (req,res,next) =>{
    const { id } = req.params;

    const product = await productModel.findById(id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    });
});


//Forgot Password
exports.forgotPassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await userModel.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found",404));
    }
    //Get resetpassword token
    const resetToken=user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});
    //create reset password url
    //req.protocol= http or https
    //req.get("host")=localhost:4000
    //resetToken=token
    //resetPasswordUrl= http://localhost:4000/password/reset/token
    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message=`Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email, then ignore it.`;
    try{
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message,
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        });
    }catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500));
    }
});
