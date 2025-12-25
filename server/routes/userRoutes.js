import express from "express";
import {
  getUserById,
  getUserProfile,
  getUserResumes,
  loginUser,
  registerUser,
} from "../controllers/UserController.js";
import protect from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

// Register new user
userRouter.post("/register", registerUser);

// Login user
userRouter.post("/login", loginUser);

// Get user by ID (JWT protected)
userRouter.get("/data", protect, getUserById);

// Get current user profile (JWT protected)
userRouter.get("/profile", protect, getUserProfile);

// Get user resumes
userRouter.get("/resumes", protect, getUserResumes);

export default userRouter;
