import { Briefcase, Plus, Sparkle, Trash2 } from "lucide-react";
import React from "react";

const ExperienceForm = ({ data, onChange }) => {
  // Add a new experience
  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  // Remove experience at index
  const removeExperience = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  // Update a specific field in an experience
  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="items-center text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">Add your job experience</p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {/* No experience placeholder */}
      {data.length === 0 ? (
        <div className="text-center py-6 text-gray-400">
          <Briefcase className="size-10 mx-auto mb-3" />
          <p className="text-sm font-medium">No work experience added yet.</p>
          <p className="text-xs mt-1">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              {/* Title row */}
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-800">
                  Experience #{index + 1}
                </h4>
                <button onClick={() => removeExperience(index)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>

              {/* Company & Position */}
              <input
                type="text"
                placeholder="Company Name"
                value={experience.company || ""}
                onChange={(e) =>
                  updateExperience(index, "company", e.target.value)
                }
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <input
                type="text"
                placeholder="Job Title / Position"
                value={experience.position || ""}
                onChange={(e) =>
                  updateExperience(index, "position", e.target.value)
                }
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />

              {/* Dates */}
              <div className="flex gap-2">
                <input
                  type="month"
                  value={experience.start_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  className="w-1/2 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <input
                  type="month"
                  value={experience.is_current ? "" : experience.end_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  disabled={experience.is_current}
                  className="w-1/2 px-3 py-2 text-sm rounded-lg border border-gray-300 disabled:bg-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              {/* Currently Working Checkbox */}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    onChange(
                      data.map((exp, i) =>
                        i === index
                          ? {
                              ...exp,
                              is_current: checked,
                              end_date: checked ? "" : exp.end_date,
                            }
                          : exp
                      )
                    );
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <span className="text-sm text-gray-700">
                  Currently Working Here
                </span>
              </label>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>
                  <button className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50">
                    <Sparkle className="w-3 h-3" />
                    Enhance with AI
                  </button>
                </div>
                <textarea
                  value={experience.description || ""}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  placeholder="Describe your key responsibilities and achievements..."
                  rows={4}
                  className="w-full text-sm px-3 py-2 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
