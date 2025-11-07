import express from "express";
import { verifyUser } from "../middleware/authentication.js";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();
router.get("/", verifyUser, getTasks);
router.post("/", verifyUser, createTask);
router.put("/:id", verifyUser, updateTask);
router.delete("/:id", verifyUser, deleteTask);
export default router;
