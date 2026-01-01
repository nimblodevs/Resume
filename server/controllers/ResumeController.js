import clientimageKit from "../config/imageKit.js";
import Resume from "../models/ResumeModel.js";
import fs from "fs";

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
// Get Public Resume By ID
// GET: /api/resumes/public/:resumeId
// ---------------------
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    // Find the resume that is marked public
    const resume = await Resume.findOne({ _id: resumeId, public: true });

    if (!resume) {
      return res.status(404).json({
        status: "error",
        message: "❌ Resume not found or is private",
      });
    }

    res.status(200).json({
      status: "success",
      message: "✅ Public resume retrieved successfully",
      resume,
    });
  } catch (err) {
    console.error("Get public resume error:", err);
    res.status(500).json({
      status: "error",
      message: "⚠️ Server error while fetching public resume",
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
    const userId = req.userId; // from auth middleware
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    // Parse resumeData safely
    let resumeDataCopy;
    try {
      resumeDataCopy = JSON.parse(JSON.stringify(resumeData));
    } catch {
      return res.status(400).json({
        status: "error",
        message: "❌ Invalid resumeData JSON",
      });
    }

    // Handle image upload
    if (image) {
      const imageBufferData = fs.createReadStream(image.path);

      const response = await clientimageKit.files.upload({
        file: imageBufferData,
        fileName: `resume-${Date.now()}.png`,
        folder: "user-resumes",
        transformation: {
          pre: `w-300,h-300,fo-face,z-0.75${
            removeBackground ? ",e-bgremove" : ""
          }`,
        },
      });

      // Delete local file after upload
      fs.unlink(image.path, (err) => {
        if (err) console.error("Failed to delete temp image:", err);
      });

      resumeDataCopy.personal_info = resumeDataCopy.personal_info || {};
      resumeDataCopy.personal_info.image = response.url;
    }

    // Update resume with authorization check
    const resume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId }, // filter by _id + owner
      resumeDataCopy,
      { new: true, runValidators: true } // return updated doc & validate
    );

    if (!resume) {
      return res.status(404).json({
        status: "error",
        message: "❌ Resume not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "✅ Resume updated successfully",
      resume,
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
