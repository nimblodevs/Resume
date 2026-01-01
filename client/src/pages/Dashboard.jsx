import React, { useEffect, useState } from "react";
import {
  FilePenIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  UploadCloud,
  XIcon,
  LoaderCircleIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import pdftotext from "react-pdftotext";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);

  const [allResumes, setAllResumes] = React.useState([]);
  const [showCreateResume, setShowCreateResume] = React.useState(false);
  const [showUploadResume, setShowUploadResume] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [resume, setResume] = React.useState(null);
  const [editResumeId, setEditResumeId] = React.useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const colors = [
    "#0284c7",
    "#9333ee",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#dc2626",
    "#d97706",
    "#0284c7",
    "#16a34a",
  ];

  const createResume = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return toast.error("Title is required");
    }
    try {
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllResumes([...allResumes, data.resume]);
      //setAllResumes((prev) => [...prev, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();

    if (!title.trim()) return toast.error("Title is required");
    if (!resume) return toast.error("Resume file is required");

    setIsLoading(true);

    try {
      const resumeText = await pdftotext(resume);

      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAllResumes = async () => {
    e.preventDefault();
    try {
      const data = await api.post("/api/users/resumes", {
        header: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const editTitle = async (e) => {
    e.preventDefault();
    try {
      const data = await api.put(
        "/api/resumes/update",
        { resumeId: editResumeId, resumeData: { title } },
        {
          header: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllResumes(
        allResumes,
        map((resume) =>
          resume._id === editResumeId ? { ...resume, title } : resume
        )
      );
      setTitle('')
      setEditResumeId("");
      toast.success(data.message)
    } catch (error) {}
  };

  const deleteResume = async (resumeId) => {
    e.preventDefault();
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this resume?"
      );
      if (confirmDelete) {
        const data = await api.delete(`/api/resumes/delete/${resumeId}`, {
          header: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllResumes(allResumes.filter((resume) => resume._id !== resumeId));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Joe Doe
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300"
          >
            <PlusIcon className="size-11 p-2.5 bg-linear-to-r from-indigo-300 to-indigo-500 rounded-full text-white" />
            <p className="text-sm group-hover:text-indigo-600">Create Resume</p>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300"
          >
            <UploadCloudIcon className="size-11 p-2.5 bg-linear-to-r from-purple-300 to-purple-500 rounded-full text-white" />
            <p className="text-sm group-hover:text-purple-600">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="my-6 border-slate-300 sm:w-[305px]" />

        {/* Resume Cards */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <button
                //key={index}
                key={resume._id}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="group relative w-full sm:w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border hover:shadow-lg transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40",
                }}
              >
                <FilePenIcon
                  className="size-7 group-hover:scale-105 transition-transform"
                  style={{ color: baseColor }}
                />

                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>

                <p
                  className="absolute bottom-1 text-[11px] transition-all px-2 text-center"
                  style={{ color: baseColor + "90" }}
                >
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                {/* Action Icons */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 hidden group-hover:flex items-center gap-2"
                >
                  <TrashIcon
                    onClick={() => deleteResume(resume._id)}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                  />

                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Create Modal */}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-10"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Create New Resume</h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter Resume Title"
                className="w-full border border-green-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded px-4 py-2 mb-4"
                required
              />

              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Create Resume
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {/* Upload Modal */}
        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-10"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter Resume Title"
                className="w-full border border-green-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded px-4 py-2 mb-4"
                required
              />

              <label htmlFor="resume-input" className="block text-sm">
                Select resume file
                <div className="flex flex-col items-center justify-center w-full gap-2 border border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 text-slate-400 hover:text-green-700 cursor-pointer">
                  {resume ? (
                    <p className="text-sm text-green-700">{resume.name}</p>
                  ) : (
                    <>
                      <UploadCloud className="size-10" />
                      <p className="text-sm">
                        Click to upload or drag and drop
                      </p>
                    </>
                  )}
                </div>
              </label>

              <input
                id="resume-input"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => setResume(e.target.files[0])}
                required
              />

              <button
              disabled={isLoading}
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors
                flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <LoaderCircleIcon className="animate-spin size-4 text-white" />
                )}
                {isLoading ? "Uploading..." : "Upload Resume"}
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {/* Edit Modal */}
        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-10"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter Resume Title"
                className="w-full border border-green-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded px-4 py-2 mb-4"
                required
              />

              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Update
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
