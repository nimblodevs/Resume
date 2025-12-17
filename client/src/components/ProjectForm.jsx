import { Plus, Trash2, Link2, Activity, Folder, Layers } from "lucide-react";
import React from "react";

const ProjectForm = ({ data = [], onChange }) => {
  const MAX_DESC = 500;

  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
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
            Projects
          </h3>
          <p className="text-sm text-gray-500">Add your projects</p>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-6 text-gray-400">
          <Layers className="size-10 mx-auto mb-3" />
          <p className="text-sm font-medium">No projects added yet.</p>
          <p className="text-xs mmt-1">Click “Add Project” to get started.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {data.map((project, index) => (
            <div
              key={index}
              className="p-5 border border-gray-200 rounded-xl space-y-4"
            >
              {/* Title Row */}
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-800">
                  Project #{index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:scale-110 transition-transform"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Project Name */}
              <div>
                <input
                  value={project.name || ""}
                  onChange={(e) => updateProject(index, "name", e.target.value)}
                  type="text"
                  placeholder="Project Name *"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                {!project.name && (
                  <p className="text-xs text-gray-400 mt-1">
                    This field helps highlight your work
                  </p>
                )}
              </div>

              {/* Project Type */}
              <input
                value={project.type || ""}
                onChange={(e) => updateProject(index, "type", e.target.value)}
                type="text"
                placeholder="Project Type (e.g. Web App, API, Mobile App)"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />

              {/* Description */}
              <div>
                <textarea
                  value={project.description || ""}
                  rows={4}
                  maxLength={MAX_DESC}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                  placeholder="Describe what you built, tools used, and impact..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 resize-none rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <div className="text-right text-xs text-gray-400 mt-1">
                  {project.description?.length || 0}/{MAX_DESC}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectForm;
