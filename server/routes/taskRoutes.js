import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getAllTasks,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", protect, getAllTasks);

router.get("/:projectId", protect, getTasks);

router.post("/", protect, createTask);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);
export default router;