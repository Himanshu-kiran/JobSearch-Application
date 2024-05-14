import mongoose from "mongoose";

//mongoose.connect("mongodb+srv://himanshukiran:Kk%4012345@cluster0.z4vkef8.mongodb.net/");

export const dbConnection=()=>{
    mongoose
       .connect(process.env.MONGO_URI,{
        dbName:"JOB_SEARCH" 
       })
       .then(function(){
        console.log("connected to db")
       })
       .catch(function(err){
        console.log(`error while connecting:${err}`)
       })
} 