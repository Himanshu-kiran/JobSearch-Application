import {Router} from "express";
import {deleteJob, getAllJobs, getmyJobs, postJob, updateJob} from "../controllers/jobController.js"
import { isAuthorized } from "../middlewares/auth.js";

const router=Router();

router.get("/getall",getAllJobs);
router.post("/post",isAuthorized,postJob)
router.get("/getmyJobs",isAuthorized,getmyJobs)
router.put("/updateJobs/:id",isAuthorized,updateJob)
router.delete("/deleteJob",isAuthorized,deleteJob)

export default router;
