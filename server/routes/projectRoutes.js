import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", protect, createProject);

router.get("/", protect, getProjects);

router.get("/:id", protect, getProject);

router.put("/:id", protect, updateProject);

router.delete("/:id", protect, deleteProject);

export default router;