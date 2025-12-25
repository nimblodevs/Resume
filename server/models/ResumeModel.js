import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    // Reference to the user who owns this resume
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Basic resume info
    title: { type: String, default: "Untitled Resume" },
    public: { type: Boolean, default: false },
    template: { type: String, default: "classic" },
    accent_color: { type: String, default: "#3B82F6" },
    professional_summary: { type: String, default: "" },

    // Personal information
    personal_info: {
      image: { type: String, default: "" },
      full_name: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      website: { type: String, default: "" },
    },

    // Work experience
    experience: [
      {
        company: { type: String, required: true },
        position: { type: String, required: true },
        start_date: { type: Date, required: true },
        end_date: { type: Date },
        description: { type: String, default: "" },
        is_current: { type: Boolean, default: false },
      },
    ],

    // Projects
    projects: [
      {
        name: { type: String, required: true },
        type: { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],

    // Education
    education: [
      {
        institution: { type: String, required: true },
        degree: { type: String, default: "" },
        field: { type: String, default: "" },
        graduation_date: { type: Date },
        gpa: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true, minimize: false }
);

// Prevent model recompilation errors in server reloads
const Resume = mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);

export default Resume;
