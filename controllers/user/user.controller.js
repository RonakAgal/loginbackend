import { userCollection } from "../../models/user.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import expressAsyncHandler from "express-async-handler"
import CustomError from "../../utils/CustomError.util.js";
import { generateJsonWebToken } from "../../utils/jwt.util.js";
import bcrypt from "bcryptjs";



export const registerUser = expressAsyncHandler(async (req, res, next) => {
    const { userName, email, password } = req.body;
    // console.log(userName,email,password);

    let newUser = await userCollection.create({ userName, email, password });
    new ApiResponse(201, true, 'User Created Successfully', newUser).send(res);
})

export const loginUser = expressAsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // console.log("printed e :",email);
    // console.log("printed p :",password);
    
    let existingUser = await userCollection.findOne({ email }).select('+password');
    if (!existingUser) return next(new CustomError("User Doesn't exist", 404));
    

    // let isMatch = await existingUser.comparePassword(password);
    let isMatch = await bcrypt.compare(password, existingUser.password);
    // console.log(password);
    

    if (!isMatch) return next(new CustomError('Invalid credentials', 401));

    let token = generateJsonWebToken(existingUser._id);

    res.cookie('token', token, {
        maxAge: 1 * 60 * 60 * 1000,
        httpOnly: true,
    });

    new ApiResponse(200, true, "User logged in Successfully", token).send(res);
})

export const logoutUser = expressAsyncHandler(async (req, res, next) => {
  // res.clearCookie('token', '', { maxAge: Date.now() });
  res.clearCookie('token');
  new ApiResponse(200, true, 'User logged out successfully').send(res);
});


export const getProfile = expressAsyncHandler(async (req,res,next)=>{
   if (!req.user) return next(new CustomError("Unauthorized", 401));
  new ApiResponse(200, true, "Profile fetched successfully", req.user).send(res);
})



// for get allusers
export const getAllUser = expressAsyncHandler(async (req, res, next) => {
  const users = await userCollection.find().select("-password");
  new ApiResponse(200, true, "All users fetched successfully", users).send(res);
});
