import Resume from "../models/Resume.js";

// ---------------------
// Create New Resume Controller
// POST: /api/resumes/create
// ---------------------
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    // 1️⃣ Create a new resume with default values or from request body
    const newResume = await Resume.create({ userId, title });

    // 2️⃣ Return success response
    res.status(201).json({
      status: "success",
      message: "✅ Resume created successfully",
      resume: newResume,
    });
  } catch (err) {
    console.error("Create resume error:", err);
    res.status(500).json({
      status: "error",
      message: "⚠️ Server error while creating resume",
      error: err.message,
    });
  }
};

// ---------------------
// Delete Resume Controller
// POST: /api/resumes/delete/:resumeId
// ---------------------
export const deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.userId;

    const Resume = await Resume.findOneAndDelete({ _id: resumeId, userId });

    if (!Resume) {
      return res.status(404).json({
        status: "error",
        message: "❌ Resume not found or already deleted",
      });
    }

    res.status(200).json({
      status: "success",
      message: "✅ Resume deleted successfully",
      resume: Resume,
    });
  } catch (err) {
    console.error("Delete resume error:", err);
    res.status(500).json({
      status: "error",
      message: "⚠️ Server error while deleting resume",
      error: err.message,
    });
  }
};

// ---------------------
// Get Single Resume by ID
// GET: /api/resumes/:resumeId
// ---------------------
export const getResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.userId;

    const resume = await Resume.findOne({ _id: resumeId, userId });

    if (!resume) {
      return res.status(404).json({
        status: "error",
        message: "❌ Resume not found",
      });
    }

    //resume.__v = undefined
    //resume.createdAt = undefined
    //resume.updatedAt=undefined

    // Convert Mongoose document to plain object
    const resumeObj = resume.toObject();

    // Remove unwanted fields
    delete resumeObj.__v;
    delete resumeObj.createdAt;
    delete resumeObj.updatedAt;

    res.status(200).json({
      status: "success",
      resume: resumeObj,
    });
  } catch (err) {
    console.error("Get resume error:", err);
    res.status(500).json({
      status: "error",
      message: "⚠️ Server error while fetching resume",
      error: err.message,
    });
  }
};

// ---------------------
// Update Resume Public Status
// PUT: /api/resumes/public
// ---------------------
import Resume from "../models/Resume.js";

export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId, isPublic } = req.body; // expects { resumeId, isPublic: true/false }
    const userId = req.userId;

    // 1️⃣ Find the resume and update its public status
    const updatedResume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId },
      { $set: { public: isPublic } },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({
        status: "error",
        message: "❌ Resume not found or update failed",
      });
    }

    // 2️⃣ Convert to plain object and remove unwanted fields
    const resumeObj = updatedResume.toObject();
    delete resumeObj.__v;
    delete resumeObj.createdAt;
    delete resumeObj.updatedAt;
    delete resumeObj.userId; // optional, hide owner info

    res.status(200).json({
      status: "success",
      message: `✅ Resume is now ${isPublic ? "public" : "private"}`,
      resume: resumeObj,
    });
  } catch (err) {
    console.error("Set resume public error:", err);
    res.status(500).json({
      status: "error",
      message: "⚠️ Server error while updating resume public status",
      error: err.message,
    });
  }
};


// ---------------------
// Update Resume
// PUT: /api/resumes/:resumeId
// ---------------------
export const updateResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.userId;

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedResume) {
      return res.status(404).json({
        status: "error",
        message: "❌ Resume not found or update failed",
      });
    }

    res.status(200).json({
      status: "success",
      message: "✅ Resume updated successfully",
      resume: updatedResume,
    });
  } catch (err) {
    console.error("Update resume error:", err);
    res.status(500).json({
      status: "error",
      message: "⚠️ Server error while updating resume",
      error: err.message,
    });
  }
};
