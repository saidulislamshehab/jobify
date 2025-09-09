import express from "express";
import { createJobSeeker, loginJobSeeker, getJobSeeker, getJobSeekerById, updateJobSeeker, deleteJobSeeker, updateSkills, updateAboutMe } from "../controller/Job_Seeker_Controller.js";
import { createClientProject, getClientProjects, getClientProjectById, updateClientProject, deleteClientProject, publishClientProject } from "../controller/ClientProject_Controller.js";

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

// Test endpoint to verify projects API
router.get("/projects/test", async (req, res) => {
    try {
        const ClientProject = (await import("../models/ClientProject.js")).default;
        const count = await ClientProject.countDocuments();
        res.json({ 
            message: "Projects API is working!",
            totalProjects: count,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Job Seeker routes
router.post("/create", createJobSeeker);
router.post("/login", loginJobSeeker);
router.get("/get", getJobSeeker);
router.get("/:id", getJobSeekerById);
router.put("/update/:id", updateJobSeeker);
router.put("/update-skills/:id", updateSkills);
router.put("/update-about-me/:id", updateAboutMe);
router.delete("/delete/:id", deleteJobSeeker);

// Client Project routes
router.post("/projects/create", createClientProject);
router.get("/projects", getClientProjects);
router.get("/projects/:id", getClientProjectById);
router.put("/projects/update/:id", updateClientProject);
router.delete("/projects/delete/:id", deleteClientProject);
router.put("/projects/publish/:id", publishClientProject);

export default router;