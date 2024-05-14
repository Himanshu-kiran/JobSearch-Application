import mongoose from "mongoose";
import validator from "validator";
import { User } from "./userSchema.js";
const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "PLease provide your name!"],
        minLength: [3, "Please provide atleast 3 charactsers!"],
        MaxLength: [32, "Please provide atmax 32 charactsers!"]
    },
    email: {
        type: String,
        required: [true, "Provide your email!"],
        validate: [validator.isEmail, "Please use valid email!"]
    },
    Phone: {
        type: Number,
        required: [true, "Please provide your phone number"],
    },
    address: {
        type: String,
        required: [true, "Provide your address",]
    },
    coverLetter: {
        type: String,
        required: [true, "Please provide your cv letter"],
    },
    resume: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    applicantID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true,
        },
        role: {
            type: String,
            enum: ["Job Seeker"],
            required: true
        },
    },
    employerID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            enum: ["Employer"],
            required: true
        }
    }
})

export const Application=mongoose.model("Application",applicationSchema);