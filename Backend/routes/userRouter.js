import express from "express";
import { register,login, logout} from "../controllers/userController.js";
import {isAuthorized}  from "../middlewares/auth.js"
const router = express.Router();

router.post("/register", register);
router.post("/login",login);
router.get("/logout",isAuthorized,logout);

export default router;







/* 
import express from "express";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";


const router = express.Router();

router.post("/register", catchAsyncError(async (req, res, next) => {
    const { name, email, Phone, role, Password } = req.body;
    if (!name || !email || !Phone || !role || !Password) {
        return next(new ErrorHandler("Please fill in all required fields.", 400));
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return next(new ErrorHandler("Email already exists.", 400));
    }
    const user = await User.create({
        name,
        email,
        Phone,
        role,
        Password
    });
    res.status(200).json({
        success: true,
        message: "User registered!",
        user,
    });
}))

export default router;
 */