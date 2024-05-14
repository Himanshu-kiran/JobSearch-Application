import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js"


export const employerGetAllAplications = catchAsyncError(async function (req, res, next) {
    //role property is extracted from the user object using object destructuring
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job seeker not allowed to perform this.", 400));
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
        success: true,
        applications
    })
})

export const jobseekerGetAllAplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.body;
    if (role === "Employer") {
        return next(new ErrorHandler("Employer not allowed to perform this.", 400));
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
        success: true,
        applications
    })
})

export const jobseekerDeleteAplications = catchAsyncError(async function (req, res, next) {
    //role property is extracted from the user object using object destructuring
    const { role } = req.user;
    if (role === "Employer") {
        return next(new ErrorHandler("Employer not allowed to perform this.", 400));
    }
    const { id } = req.params;
    const application = await Application.findById(id);

    if (!application) {
        return next(new ErrorHandler("Oops! aaplication not found!"), 404)
    }

    await application.deleteOne();
    res.status(200).json({
        success: true,
        amessge: "Application is deleted !"
    })
})