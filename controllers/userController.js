const ErrorHandler=require("../utils/errorHandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const userModel=require("../models/userModel");
const sendToken=require("../utils/jwtToken");
const sendEmail=require("../utils/sendEmail.js");
const crypto=require("crypto");

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
    const resetToken=user.getResetPasswordT0oken();
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


//reset password
//forget password loke lo gmail htl win lr dk token url go user ka click loke yin 
// server ka aedr go pyn  hash loke p database htl ka hash token nk sit kyi dr
//resetpassword
exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{
  const resetPasswordToken=crypto
  .createHash("sha256")
  .update(req.params.token)
  .digest("hex");
    

  //database htl ka hashed token and expire time nk sit kyi dr url ka ya lr dk plaintext go hashed loke p
    const user = await userModel.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler("Invalid or expired reset token", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    //user yk new ps go save loke ml
    user.password = req.body.password;
    user.resetPasswordToken = undefined;//token go clear loke ml
    user.resetPasswordExpire = undefined;//expire time go clear loke ml
    await user.save();//user go save loke ml

    sendToken(user, 200, res);
});

//Get currently logged in User Details
exports.getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    //req.user=logged in user ka id shi ml
    const user=await userModel.findById(req.user.id);

   if(!user){
       return next(new ErrorHandler("User not found",404));
   }

   res.status(200).json({
       success:true,
       user
   });
});

//update user password
exports.updatePassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await userModel.findById(req.user.id).select("+password");
    //check previous user password
    //previous password go compare loke ml
    //ps chg yin ayin sone ayin ps htae ya dl
    const isMatched=await user.comparePassword(req.body.oldPassword);
    if(!isMatched){
        return next(new ErrorHandler("Old password is incorrect",400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }

    user.password=req.body.newPassword;
    await user.save();
    sendToken(user,200,res);
});

//update user profile
exports.updateProfile=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
    };
    //we will add cloudinary later

    const user=await userModel.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    sendToken(user,200,res);
});

//Get all users(admin)
//admin ka user yk detail kyi mr
exports.getAllUser = catchAsyncErrors(async(req,res,next)=> {
    const users = await userModel.find();

    

res.status(200).json({
    success : true,
    users,
});

}
);

exports.getSingleUser = catchAsyncErrors(async(req,res,next)=> {
    const user = await userModel.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`User doesnot exist with id :${req.params.id}`)
    );
    }
   

res.status(200).json({
    success : true,
    user,
});

}
);

//update user role --Only admin can do
exports.updateUserRole=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    };
    //we will add cloudinary later

    const user=await userModel.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    sendToken(user,200,res);
});

//Delete User   --Admin
exports.deleteUser=catchAsyncErrors(async(req,res,next)=>{
  
    //we will add cloudinary later

    const user=await userModel.findById(req.user.id);

    if(!user) {
        return next(
            new ErrorHandler(`User doesnot exist with id: ${req.params.id}`)
        )
    }

    await user.deleteOne();

    res.status(200).json({
        success:true,
        message:"user deleted succesfully"
    })
});



/**
 * @swagger
 * tags:
 *   name: User
 *   description: User authentication and account management
 */

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing or invalid input
 */

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login an existing user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       400:
 *         description: Missing email or password
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/v1/logout:
 *   get:
 *     summary: Logout current user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */

/**
 * @swagger
 * /api/v1/password/forgot:
 *   post:
 *     summary: Send password reset link to user's email
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Email sending failed
 */

/**
 * @swagger
 * /api/v1/password/reset/{token}:
 *   put:
 *     summary: Reset password using token sent to email
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Reset password token from email link
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - confirmPassword
 *             properties:
 *               password:
 *                 type: string
 *                 example: newpassword123
 *               confirmPassword:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired token / Password mismatch
 *       404:
 *         description: User not found
 */


