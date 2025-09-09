import express from "express";
import { createClientProject, getClientProjects, getClientProjectById, updateClientProject, deleteClientProject, publishClientProject } from "../controller/ClientProject_Controller.js";

const router = express.Router();

// Client Project routes
router.post("/create", createClientProject);
router.get("/", getClientProjects);
router.get("/:id", getClientProjectById);
router.put("/update/:id", updateClientProject);
router.delete("/delete/:id", deleteClientProject);
router.put("/publish/:id", publishClientProject);

export default router;
