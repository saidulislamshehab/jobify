import express from "express";
import { createJobSeeker, loginJobSeeker, getJobSeeker, getJobSeekerById, updateJobSeeker, deleteJobSeeker, updateSkills, updateAboutMe, updateProfile, updateGitHubProjects, updateExperience, updateEducation, updateLanguages, migrateUserData, getMe, refreshAccessToken, logout } from "../controller/Job_Seeker_Controller.js";
import { createClientProject, getClientProjects, getClientProjectById, updateClientProject, deleteClientProject, publishClientProject } from "../controller/ClientProject_Controller.js";
import { createBid, getBidsForProject, getBidsByFreelancer, updateBidStatus, withdrawBid, getBidById, getBidStats } from "../controller/Bid_Controller.js";
import { authenticate } from "../middleware/auth.js";

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

// Test endpoint to verify update functionality
router.post("/test-update", async (req, res) => {
    try {
        const { testData } = req.body;
        console.log('Test update received:', testData);
        res.json({ 
            message: "Test update successful",
            receivedData: testData,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Test update error:', error);
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

// Job Seeker routes (align with client expectations)
router.post("/register", createJobSeeker);
router.post("/login", loginJobSeeker);
router.get("/me", authenticate, getMe);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logout);

// Admin/listing endpoints
router.get("/get", authenticate, getJobSeeker);

// Profile update endpoints (protected)
router.put("/update/:id", authenticate, updateJobSeeker);
router.put("/update-skills/:id", authenticate, updateSkills);
router.put("/update-about-me/:id", authenticate, updateAboutMe);
router.put("/update-profile/:id", authenticate, updateProfile);
router.put("/update-github-projects/:id", authenticate, updateGitHubProjects);
router.put("/update-experience/:id", authenticate, updateExperience);
router.put("/update-education/:id", authenticate, updateEducation);
router.put("/update-languages/:id", authenticate, updateLanguages);
router.put("/migrate-user-data/:id", authenticate, migrateUserData);
router.delete("/delete/:id", authenticate, deleteJobSeeker);

// Client Project routes (protect write operations)
router.post("/projects/create", authenticate, createClientProject);
router.get("/projects", getClientProjects);
router.get("/projects/:id", getClientProjectById);
router.put("/projects/update/:id", authenticate, updateClientProject);
router.delete("/projects/delete/:id", authenticate, deleteClientProject);
router.put("/projects/publish/:id", authenticate, publishClientProject);

// Bid routes (protect write operations)
router.post("/bids/create", authenticate, createBid);
router.get("/bids/project/:projectId", getBidsForProject);
router.get("/bids/freelancer/:freelancerId", authenticate, getBidsByFreelancer);
router.get("/bids/:bidId", getBidById);
router.put("/bids/status/:bidId", authenticate, updateBidStatus);
router.put("/bids/withdraw/:bidId", authenticate, withdrawBid);
router.get("/bids/stats/:projectId", getBidStats);

// Keep the dynamic ID route last to avoid conflicts with '/projects'
router.get("/:id", getJobSeekerById);

export default router;