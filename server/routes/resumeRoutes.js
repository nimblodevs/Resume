import express from "express";
import {
  createResume,
  deleteResume,
  getPublicResumeById,
  getResumeById,
  updateResume,
} from "../controllers/ResumeController.js";
import protect from "../middlewares/authMiddleware.js";
import upload from "../config/multer.js";

const resumeRouter = express.Router();

// Create a resume
resumeRouter.post("/create", protect, createResume);
// Update a resume
resumeRouter.put("/update", upload.single("image"), protect, updateResume);
// Delete a resume
resumeRouter.delete("/delete/:resumeId", protect, deleteResume);
// Get resume by ID (private)
resumeRouter.get("/get/:resumeId", protect, getResumeById);
// Get public resume by ID
resumeRouter.get("/public/:resumeId", getPublicResumeById);

export default resumeRouter;


