import { get } from "mongoose";
import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js"
import { Job } from "../models/jobSchema.js";

export const getAllJobs = catchAsyncError(async (req, res, next) => {
    const jobs = await Job.find({ expired: false })
    res.status(200).json({
        success: true,
        jobs,
    })
});

export const postJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.body;
    console.log(req.body);
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job seeker not allowed to post the job.", 400));
    }
    const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo } = req.body;

    if (!title || !description || !category || !country || !city || !location) {
        return next(new ErrorHandler("please provide full job details", 400))
    }
    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
        return next(new ErrorHandler("Provide salary details!"))
    }
    if (salaryFrom && salaryTo && fixedSalary) {
        return next(new ErrorHandler("Provide any one type of salary details!"))
    }

    const postedBy = req.user;

    const job = await Job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy
    })
    console.log("MEOW 2");

    res.status(200).json({
        success: true,
        msg: "Job posted successfully! "
    })
})

export const getmyJobs = catchAsyncError(async (req, res, next) => {
    const { role } = req.body;

    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job seeker not allowed to perform this.", 400));
    }
    const myJobs = await Job.find({ postedby: req.user._id });
    res.status(200).json({
        success: true,
        myJobs
    })
})

export const updateJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.body;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job seeker not allowed to perform this.", 400));
    }
    const { id } = req.params;
    //find it in Job(not job)databsse
    //let because it is to be updated
    let job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("Oopss!job not found.", 400))
    }
    //store whatever came in re.user
    job = await Job.findByIdAndUpdate(id, req.body, {
        //return the modified document rather than the original one.
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        job,
        message: "Updated successfully"
    })
})

export const deleteJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
  
    console.log(req.user);
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job seeker not allowed to perform this.", 400));
    }

    const {id} = req.params;
    let job = await Job.findById(id);

    if (!job) {
        return next(new ErrorHandler("Oopss!job not found.", 404))
    }

    await job.deleteOne();
    res.status(200).json({
        success:true,
       message: "Job deleted successfully!"
    })

})