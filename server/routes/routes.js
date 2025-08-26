import express from "express";
import { createJobSeeker, loginJobSeeker, getJobSeeker, getJobSeekerById, updateJobSeeker, deleteJobSeeker } from "../controller/Job_Seeker_Controller.js";

const router = express.Router();

// Test endpoint to verify server and database are working
router.get("/test", async (req, res) => {
    try {
        res.json({ 
            message: "Server is working!",
            timestamp: new Date().toISOString(),
            database: "Connected"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/create", createJobSeeker);
router.post("/login", loginJobSeeker);
router.get("/get", getJobSeeker);
router.get("/:id", getJobSeekerById);
router.put("/update/:id", updateJobSeeker);
router.delete("/delete/:id", deleteJobSeeker);

export default router;