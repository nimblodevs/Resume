import { Check, Layout, X } from "lucide-react";
import React from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview: "A clean, traditional resume format with clear sections.",
    },
    {
      id: "modern",
      name: "Modern",
      preview: "A sleek, contemporary design with clean typography.",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "A simple, elegant layout with ample white space.",
    },
    {
      id: "minimal-image",
      name: "Minimal with Image",
      preview: "Minimal design that includes a profile image.",
    },
    {
      id: "startup",
      name: "Startup",
      preview: "Modern CV focused on skills and projects for startups.",
    },
    {
      id: "creative",
      name: "Creative",
      preview: "A visually appealing template with colors and graphics.",
    },
    {
      id: "designer",
      name: "Designer",
      preview: "Portfolio-heavy template for designers.",
    },
    {
      id: "infographic",
      name: "Infographic",
      preview: "Uses charts and visuals to represent skills and experience.",
    },
    {
      id: "tech",
      name: "Tech",
      preview: "Modern, clean template for technical CVs with skills emphasis.",
    },
    {
      id: "executive",
      name: "Executive",
      preview: "Professional template tailored for executive profiles.",
    },
    // New templates
    {
      id: "timeline",
      name: "Timeline",
      preview:
        "A structured template showing career milestones in timeline format.",
    },
    {
      id: "elegant",
      name: "Elegant",
      preview: "Sophisticated, stylish CV with elegant typography.",
    },
    {
      id: "tech-modern",
      name: "Tech Modern",
      preview: "Modern tech-focused template with clean sections and colors.",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} /> <span className="max-sm:hidden">Template</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-80 max-h-[calc(4*96px)] overflow-y-auto p-3 space-y-3 z-10 bg-white border border-gray-200 rounded-md shadow-sm">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-1 right-1 p-2 rounded-full hover:bg-gray-200 transition-all"
          >
            <X size={16} />
          </button>

          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
              className={`relative p-3 border rounded-md cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? "border-blue-400 bg-blue-100"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
              }`}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="size-5 bg-blue-400 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
              <div className="space-y-1">
                <h4 className="font-medium text-gray-800">{template.name}</h4>
                <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-gray-500 italic">
                  {template.preview}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
