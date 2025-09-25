import express from "express";
import { createClientProject, getClientProjects, getClientProjectById, updateClientProject, deleteClientProject, publishClientProject } from "../controller/ClientProject_Controller.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Client Project routes
router.post("/create", authenticate, createClientProject);
router.get("/", getClientProjects);
router.get("/:id", getClientProjectById);
router.put("/update/:id", authenticate, updateClientProject);
router.delete("/delete/:id", authenticate, deleteClientProject);
router.put("/publish/:id", authenticate, publishClientProject);

export default router;
