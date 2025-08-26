import express from "express";
import { createJobSeeker, getJobSeeker, updateJobSeeker, deleteJobSeeker } from "../controller/Job_Seeker_Controller.js";

const router = express.Router();

router.post("/create", createJobSeeker);
router.get("/get", getJobSeeker);
router.put("/update/:id", updateJobSeeker);
router.delete("/delete/:id", deleteJobSeeker);

export default router;