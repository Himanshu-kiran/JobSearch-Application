import {catchAsyncError} from "./catchAsyncError.js"
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import {User} from "../models/userSchema.js"

export const isAuthorized=catchAsyncError(async(req,res,next)=>{
    console.log(req.body);
    const {token}=req.cookies;

    if(!token){
        // return res.json({
        //     msg:"User not authorized"
        // })
        return next (new ErrorHandler("User not authorized",400));
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=decoded.id
    next()

//decoded stores user id
    // req.user=await User.findById(decoded.id);
    
})