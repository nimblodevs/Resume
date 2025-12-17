import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const formatLink = (url) => url?.replace(/^https?:\/\/(www\.)?/, "") || "";

  const info = data.personal_info || {};
  const experience = Array.isArray(data.experience) ? data.experience : [];
  const education = Array.isArray(data.education) ? data.education : [];

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 shadow-sm">
      {/* Header */}
      <header
        className="p-8 text-white"
        style={{ backgroundColor: accentColor }}
      >
        <h1 className="text-4xl font-light mb-2">
          {info.full_name || "Your Name"}
        </h1>

        {info.profession && (
          <p className="text-lg font-light opacity-90">{info.profession}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mt-4">
          {info.email && (
            <div className="flex items-center gap-2">
              <Mail className="size-4" />
              <span>{info.email}</span>
            </div>
          )}

          {info.phone && (
            <div className="flex items-center gap-2">
              <Phone className="size-4" />
              <span>{info.phone}</span>
            </div>
          )}

          {info.location && (
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>{info.location}</span>
            </div>
          )}

          {info.linkedin && (
            <a
              href={info.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Linkedin className="size-4" />
              <span className="break-all text-xs">
                {formatLink(info.linkedin)}
              </span>
            </a>
          )}

          {info.website && (
            <a
              href={info.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Globe className="size-4" />
              <span className="break-all text-xs">
                {formatLink(info.website)}
              </span>
            </a>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="p-8">
        {/* Professional Summary */}
        {data.professional_summary && (
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">
              Experience
            </h2>

            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l border-gray-200"
                >
                  <div className="flex justify-between items-start gap-3 flex-wrap">
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">
                        {exp.position || "Job Title"}
                      </h3>
                      <p className="font-medium" style={{ color: accentColor }}>
                        {exp.company || "Company Name"}
                      </p>
                    </div>

                    <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded whitespace-nowrap">
                      {formatDate(exp.start_date)} –{" "}
                      {exp.is_Current ? "Present" : formatDate(exp.end_date)}
                    </div>
                  </div>

                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed mt-3 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section>
            <h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">
              Education
            </h2>

            <div className="space-y-5">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start flex-wrap gap-3">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {edu.degree || "Degree"}
                        {edu.field && ` in ${edu.field}`}
                      </h3>
                      <p className="font-medium" style={{ color: accentColor }}>
                        {edu.institution}
                      </p>
                    </div>

                    {edu.graduation_date && (
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded whitespace-nowrap">
                        {formatDate(edu.graduation_date)}
                      </span>
                    )}
                  </div>

                  {edu.gpa && (
                    <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {Array.isArray(data.project) && data.project.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">
              Projects
            </h2>

            <div className="space-y-6">
              {data.project.map((proj, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l border-gray-200"
                >
                  {/* Title & Type on One Line */}
                  <div className="justify-between items-center">
                    <h3 className="text-xl font-medium text-gray-900">
                      {proj.name || "Project Name"}
                    </h3>
                    {proj.type && (
                      <span
                        className="font-medium"
                        style={{ color: accentColor }}
                      >
                        {proj.type}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  {proj.description && (
                    <p className="text-gray-700 leading-relaxed mt-1 whitespace-pre-line">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;
