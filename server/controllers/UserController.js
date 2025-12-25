import Resume from "../models/ResumeModel.js";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

// ---------------------
// Generate JWT Token
// ---------------------
const generateToken = (userId) => {
  // Signs a JWT with the user ID, valid for 7 days
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

// ---------------------
// Register Controller
// POST: /api/users/register
// ---------------------
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "⚠️ Name, email, and password are required",
      });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "❌ User already exists",
      });
    }

    // 3️⃣ Create new user (password hashing handled by pre-save hook)
    const newUser = new User({ name, email, password });
    await newUser.save();

    // 4️⃣ Generate JWT token
    const token = generateToken(newUser._id);

    // 5️⃣ Remove password before sending response
    newUser.password = undefined;

    // 6️⃣ Return success response with token and user data
    res.status(201).json({
      status: "success",
      message: "✅ User registered successfully",
      token, // JWT token for authentication
      user: newUser, // User object without password (make sure password is undefined)
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      status: "error",
      message: "⚠️ Server error during registration",
      error: error.message,
    });
  }
};

// ---------------------
// Login Controller
// POST: /api/users/login
// ---------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "⚠️ Email and password are required",
      });
    }

    // 2️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "❌ Invalid email or password",
      });
    }

    // 3️⃣ Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "❌ Invalid email or password",
      });
    }

    // 4️⃣ Generate JWT token
    const token = generateToken(user._id);

    // 5️⃣ Hide password before sending response
    user.password = undefined;

    // 6️⃣ Return success response with token and user info
    res.status(200).json({
      status: "success",
      message: "✅ Login successful",
      token,
      user,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      status: "error",
      message: "⚠️ Server error during login",
      error: err.message,
    });
  }
};

// ---------------------
// Get User By ID Controller
// GET: /api/users/:id
// ---------------------
export const getUserById = async (req, res) => {
  try {
    const userId = req.userId; // assumed to come from JWT middleware

    // 1️⃣ Find user by ID
    const user = await User.findById(userId);

    // 2️⃣ Check if user exists
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "❌ User not found",
      });
    }

    // 3️⃣ Hide password before sending response
    user.password = undefined;

    // 4️⃣ Return success response
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({
      status: "error",
      message: "⚠️ Server error while fetching user",
      error: err.message,
    });
  }
};

// ---------------------
// Get Current User Controller
// GET: /api/users/profile
// ---------------------
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // from protect middleware

    // 1️⃣ Find user by ID
    const user = await User.findById(userId);

    // 2️⃣ Check if user exists
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "❌ User not found",
      });
    }

    // 3️⃣ Hide password before sending response
    user.password = undefined;

    // 4️⃣ Return success response
    res.status(200).json({
      status: "success",
      message: "✅ User profile fetched successfully",
      user,
    });
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({
      status: "error",
      message: "⚠️ Server error while fetching profile",
      error: err.message,
    });
  }
};

// ---------------------
// Get User Resumes Controller
// GET: /api/users/resumes
// ---------------------
export const getUserResumes = async (req, res) => {
  try {
    const userId = req.userId;

    // 1️⃣ Find all resumes belonging to the user
    const resumes = await Resume.find({ userId }).sort({ createdAt: -1 });

    // 2️⃣ Check if user has any resumes
    if (!resumes || resumes.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "❌ No resumes found for this user",
      });
    }

    // 3️⃣ Return success response
    res.status(200).json({
      status: "success",
      message: `✅ Found ${resumes.length} resume(s)`,
      resumes,
    });
  } catch (err) {
    console.error("Get user resumes error:", err);
    res.status(500).json({
      status: "error",
      message: "⚠️ Server error while fetching resumes",
      error: err.message,
    });
  }
};
