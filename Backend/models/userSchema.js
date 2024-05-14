import mongoose, { model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "PLease provide your name!"],
        minLength: 3,
        MaxLength: 32
    },
    email: {
        type: String,
        required: [true,"Provide your email!"],
        validate: [validator.isEmail, "Please use valid email!"]
    },
    Phone: {
        type: Number,
        required: [true, "Please provide your phone number"],
    },
    Password: {
        type: String,
        minLength: [8,"password must atleast 8 characters"],
        MaxLength:[ 32,"password must atmax 32 characters"],
        select:false
    },
    role: {
        type: String,
        required: true,
        enum: ["Job Seeker", "Employer"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

//Will run after any entry
//hashing the pasword
userSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) {
        next();
    }
    this.Password = await bcrypt.hash(this.Password, 10)
});

//comparing paassword
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.Password);
};

//generating jwt
userSchema.methods.getJWToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

export const User=mongoose.model("User",userSchema)
//module.exports = mongoose.model("User", userSchema);
