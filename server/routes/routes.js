import express from "express";
import { createJobSeeker, loginJobSeeker, getJobSeeker, getJobSeekerById, updateJobSeeker, deleteJobSeeker, updateSkills, updateAboutMe, updateProfile, updateGitHubProjects, updateExperience, updateEducation, updateLanguages, migrateUserData, getCurrentUser, refreshAccessToken, logout } from "../controller/Job_Seeker_Controller.js";
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

// Auth routes
router.post("/register", createJobSeeker);
router.post("/login", loginJobSeeker);
router.get("/me", authenticate, getCurrentUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logout);

// Job Seeker routes
router.post("/create", createJobSeeker); // legacy
router.get("/get", getJobSeeker);
router.put("/update/:id", authenticate, (req, res, next) => {
    if (req.user?.id !== req.params.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    return updateJobSeeker(req, res, next);
});
router.put("/update-skills/:id", authenticate, (req, res, next) => {
    if (req.user?.id !== req.params.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    return updateSkills(req, res, next);
});
router.put("/update-about-me/:id", authenticate, (req, res, next) => {
    if (req.user?.id !== req.params.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    return updateAboutMe(req, res, next);
});
router.put("/update-profile/:id", authenticate, (req, res, next) => {
    if (req.user?.id !== req.params.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    return updateProfile(req, res, next);
});
router.put("/update-github-projects/:id", authenticate, (req, res, next) => {
    if (req.user?.id !== req.params.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    return updateGitHubProjects(req, res, next);
});
router.put("/update-experience/:id", authenticate, (req, res, next) => {
    if (req.user?.id !== req.params.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    return updateExperience(req, res, next);
});
router.put("/update-education/:id", authenticate, (req, res, next) => {
    if (req.user?.id !== req.params.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    return updateEducation(req, res, next);
});
router.put("/update-languages/:id", authenticate, (req, res, next) => {
    if (req.user?.id !== req.params.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    return updateLanguages(req, res, next);
});
router.put("/migrate-user-data/:id", authenticate, (req, res, next) => {
    if (req.user?.id !== req.params.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    return migrateUserData(req, res, next);
});
router.delete("/delete/:id", authenticate, (req, res, next) => {
    if (req.user?.id !== req.params.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    return deleteJobSeeker(req, res, next);
});

// Client Project routes
router.post("/projects/create", createClientProject);
router.get("/projects", getClientProjects);
router.get("/projects/:id", getClientProjectById);
router.put("/projects/update/:id", updateClientProject);
router.delete("/projects/delete/:id", deleteClientProject);
router.put("/projects/publish/:id", publishClientProject);

// Bid routes
router.post("/bids/create", createBid);
router.get("/bids/project/:projectId", getBidsForProject);
router.get("/bids/freelancer/:freelancerId", getBidsByFreelancer);
router.get("/bids/:bidId", getBidById);
router.put("/bids/status/:bidId", updateBidStatus);
router.put("/bids/withdraw/:bidId", withdrawBid);
router.get("/bids/stats/:projectId", getBidStats);

// Keep the dynamic ID route last to avoid conflicts with '/projects'
router.get("/:id", getJobSeekerById);

export default router;