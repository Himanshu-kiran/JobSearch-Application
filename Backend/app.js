import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobrouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import errorMiddleware from "./middlewares/error.js"


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(fileUpload());

app.use("/api/v1/user",userRouter)
app.use("/api/v1/application",applicationRouter)
app.use("/api/v1/job",jobRouter)

dotenv.config({path:"./config/config.env"});
cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
    api_key:process.env.CLOUDINARY_CLIENT_API,
    api_secret:process.env.CLOUDINARY_CLIENT_SECRET,
});

dbConnection();


app.use(errorMiddleware);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//app.listen(3001);;
