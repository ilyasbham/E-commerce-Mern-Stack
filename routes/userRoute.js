const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword,getUserDetails,updatePassword,updateProfile} = require("../controllers/userController");
const router = express.Router();


const { isAuthenticatedUser } = require("../middleware/auth");



router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/password/forgot", forgotPassword);

router.put("/password/reset/:token", resetPassword);

router.get("/logout", logout);

router.get("/me", isAuthenticatedUser, getUserDetails);

router.put("/password/update", isAuthenticatedUser, updatePassword);

router.put("/me/update", isAuthenticatedUser, updateProfile);




module.exports = router;
