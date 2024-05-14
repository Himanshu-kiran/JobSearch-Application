import express from "express";
import { employerGetAllAplications, jobseekerDeleteAplications, jobseekerGetAllAplications} from "../controllers/applicationController.js";
import{ isAuthorized }from "../middlewares/auth.js"

const router=express.Router();

router.get("/jobseeker/getall",isAuthorized,jobseekerGetAllAplications);
router.get("/employer/getall",isAuthorized,employerGetAllAplications);
router.delete("/delete/:id",isAuthorized,jobseekerDeleteAplications);

export default router;