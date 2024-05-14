import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"plz provide job title"],
        minLength:[3,"Job title atleast 3 characters!"],
        maLength:[350,"Job title atmax 350 characters!"],
    },
    category:{
        type:String,
        required:[true,"Job category is required!"],
    },
    country:{
        type:String,
        required:[true,"Job country is required."],
    },
    city:{
        type:String,
        required:[true,"Job city is required."],
    },
    location:{
        type:String,
        required:[true,"please provide exact location!"],
        minLength:[3,"Job location atleast 3 characters!"],
        maxLength:[350,"Job location atmax 350 characters!"],
    },
    fixedsalary:{
        type:Number,
        minLength:[4,"Fixed salary must be starting fro thousand!"],
        maxLength:[9,"Tum crore se jyada dega nhi employee ko!"],
    },
    salaryFrom:{
        type:Number,
        minLength:[4,"Fixed salary must be starting fro thousand!"],
        maxLength:[9,"Tum crore se jyada dega nhi employee ko!"],
    },
    salaryTo:{
        type:Number,
        minLength:[4,"Fixed salary must be starting fro thousand!"],
        maxLength:[9,"Tum crore se jyada dega nhi employee ko!"],
    },
    expired:{
        type:Boolean,
        default:false,
    },
    jobPostedOn:{
        type:Date,
        default:Date.now,
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    }
})

export  const Job=mongoose.model("Job",jobSchema)