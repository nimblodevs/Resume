// ====================== Imports ======================
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Dummy data (temporary until API integration)
import { dummyResumeData } from "../assets/assets";

// Icons
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";

// Form Components
import PersonalInfoForm from "../components/PersonalInfoForm";
import ProfessionalSummary from "../components/ProfessionalSummary";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";

// Preview & UI Components
import ResumePreview from "../components/ResumePreview";
import ColorPicker from "../components/ColorPicker";
import TemplateSelector from "../components/TemplateSelector";

// ====================== Component ======================
const ResumeBuilder = () => {
  // Get resume ID from URL params
  const { resumeId } = useParams();

  // ---------------------- State ----------------------
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  // Tracks active form section
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  // Toggle background removal (used in personal info form)
  const [removeBackground, setRemoveBackground] = useState(false);

  // ---------------------- Load Resume ----------------------
  const loadExistingResume = () => {
    const resume = dummyResumeData.find((r) => r._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };

  // ---------------------- Sections ----------------------
  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  // Currently active section
  const activeSection = sections[activeSectionIndex];

  // Load resume on component mount
  useEffect(() => {
    loadExistingResume();
  }, []);

  // ---------------------- Actions ----------------------

  // Toggle resume public/private visibility
  const changeResumeVisibility = () => {
    setResumeData((prev) => ({ ...prev, public: !prev.public }));
  };

  // Share resume link (Web Share API)
  const handleShare = async () => {
    try {
      const frontendUrl = window.location.href.split("/app")[0];
      const resumeUrl = `${frontendUrl}/view/${resumeData._id}`;

      if (navigator.share) {
        await navigator.share({
          url: resumeUrl,
          text: "My resume",
        });
      } else {
        alert("Share not supported on this browser.");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  // Download resume using browser print
  const handleDownloadResume = () => {
    window.print();
  };

  // ====================== JSX ======================
  return (
    <div>
      {/* ================= Header ================= */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500
          hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* ================= Left Panel (Forms) ================= */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sw border border-gray-200 p-6 pt-1">
              
              {/* Progress Bar Background */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />

              {/* Progress Bar Fill */}
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r
                from-green-500 to-green-600 border-none transition-all duration-2000"
                style={{
                  width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
                }}
              />

              {/* ================= Section Navigation ================= */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                
                {/* Template & Color Selection */}
                <div className="flex items-center gap-2 mb-2 mt-3">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />

                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center">
                  {/* Previous Section */}
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prev) =>
                          Math.max(prev - 1, 0)
                        )
                      }
                      className="flex items-center gap-1 p-3 rounded-lg 
                      text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </button>
                  )}

                  {/* Next Section */}
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prev) =>
                        Math.min(prev + 1, sections.length - 1)
                      )
                    }
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm 
                    font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                      activeSectionIndex === sections.length - 1 &&
                      "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* ================= Active Form ================= */}
              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id === "summary" && (
                  <ProfessionalSummary
                    data={resumeData.professional_summary}
                    onChange={(value) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: value,
                      }))
                    }
                  />
                )}

                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, experience: data }))
                    }
                  />
                )}

                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, education: data }))
                    }
                  />
                )}

                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, project: data }))
                    }
                  />
                )}

                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, skills: data }))
                    }
                  />
                )}
              </div>

              {/* Save Button */}
              <button className="bg-gradient-to-br from-green-100 to-green-200 ring-1 ring-green-300 text-green-600 hover:ring-green-400 transition-colors rounded-md px-6 py-2 mt-6 text-sm">
                Save Changes
              </button>
            </div>
          </div>

          {/* ================= Right Panel (Preview) ================= */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              
              {/* Action Buttons */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-end gap-2">
                {resumeData.public && (
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 p-2 px-4 text-xs 
                    bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 
                    rounded-lg ring-blue-300 hover:ring transition-colors"
                  >
                    <Share2Icon className="size-4" />
                    Share
                  </button>
                )}

                <button
                  onClick={changeResumeVisibility}
                  className="flex items-center gap-2 p-2 px-4 text-xs 
                  bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 
                  rounded-lg ring-1 ring-purple-300 hover:ring-2"
                >
                  {resumeData.public ? (
                    <EyeIcon className="size-4" />
                  ) : (
                    <EyeOffIcon className="size-4" />
                  )}
                  {resumeData.public ? "Public" : "Private"}
                </button>

                <button
                  onClick={handleDownloadResume}
                  className="flex items-center gap-2 p-2 px-4 text-xs 
                  bg-gradient-to-br from-green-100 to-green-200 text-green-600 
                  rounded-lg ring-1 ring-green-300 hover:ring-2"
                >
                  <DownloadIcon className="size-4" />
                  Download
                </button>
              </div>
            </div>

            {/* Resume Preview */}
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
