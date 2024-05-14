import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js"

export const register = catchAsyncError(async (req, res, next) => {
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
    /*   res.status(200).json({
          success: true,
          message: "User registered!",
          user,
      }); */
    sendToken(user, 200, res, "User registered successfully !")
});

export const login = catchAsyncError(async (req, res, next) => {
    const { email, Password, role } = req.body;

    if (!email || !Password || !role) {
        return next(
            new ErrorHandler("please provide email,pswd and  role", 400))
    }

    const user = await User.findOne({ email }).select("+Password");
    if (!user) {
        return next(new ErrorHandler("Invalid emmmail or password!", 400))
    }

    const isPasswordMatched = await user.comparePassword(Password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid emmmail or password!", 400))
    }

    if (user.role !== role) {
        return next(new ErrorHandler("User with this role not found", 400))
    }

    sendToken(user, 200, res, "User loggedin successfullyy !");
})

export const logout = catchAsyncError(async (req, res, next) => {
    res
        .status(201)
        .cookie("token", "", {
            httpOnly: true,
            expires: new Date(Date.now())
        })
        .json({
            success: true,
            message: "User logged out successfully !"
        });
});