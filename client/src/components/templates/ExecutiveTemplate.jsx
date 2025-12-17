import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react";

const ExecutiveTemplate = ({ data = {}, accentColor = "#2563eb" }) => {
  const info = data.personal_info || {};

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const formatLink = (url) => url?.replace(/^https?:\/\/(www\.)?/, "") || "";

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 shadow-lg">
      {/* Professional Header */}
      <header className="border-b-4" style={{ borderColor: accentColor }}>
        <div className="p-8 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {info.full_name || "Your Name"}
          </h1>
          {info.profession && (
            <p className="text-xl text-gray-700 font-medium mb-4">
              {info.profession}
            </p>
          )}

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
            {info.email && (
              <div className="flex items-center gap-2">
                <Mail size={16} style={{ color: accentColor }} />
                <span>{info.email}</span>
              </div>
            )}
            {info.phone && (
              <div className="flex items-center gap-2">
                <Phone size={16} style={{ color: accentColor }} />
                <span>{info.phone}</span>
              </div>
            )}
            {info.location && (
              <div className="flex items-center gap-2">
                <MapPin size={16} style={{ color: accentColor }} />
                <span>{info.location}</span>
              </div>
            )}
            {info.linkedin && (
              <a
                href={info.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <Linkedin size={16} style={{ color: accentColor }} />
                <span>{formatLink(info.linkedin)}</span>
              </a>
            )}
            {info.website && (
              <a
                href={info.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <Globe size={16} style={{ color: accentColor }} />
                <span>{formatLink(info.website)}</span>
              </a>
            )}
            {info.github && (
              <a
                href={info.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <Github size={16} style={{ color: accentColor }} />
                <span>{formatLink(info.github)}</span>
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Professional Summary */}
        {data.professional_summary && (
          <section className="mb-8">
            <h2
              className="text-lg font-bold uppercase tracking-wide mb-3 pb-2 border-b-2"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {Array.isArray(data.experience) && data.experience.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-lg font-bold uppercase tracking-wide mb-4 pb-2 border-b-2"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Professional Experience
            </h2>
            <div className="space-y-5">
              {data.experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {exp.position}
                      </h3>
                      <p className="text-base font-semibold text-gray-700">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-sm text-gray-600 whitespace-nowrap ml-4">
                      {formatDate(exp.start_date)} –{" "}
                      {exp.is_Current ? "Present" : formatDate(exp.end_date)}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Skills */}
          {Array.isArray(data.skills) && data.skills.length > 0 && (
            <section>
              <h2
                className="text-lg font-bold uppercase tracking-wide mb-3 pb-2 border-b-2"
                style={{ color: accentColor, borderColor: accentColor }}
              >
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium border"
                    style={{ borderColor: accentColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {Array.isArray(data.education) && data.education.length > 0 && (
            <section>
              <h2
                className="text-lg font-bold uppercase tracking-wide mb-3 pb-2 border-b-2"
                style={{ color: accentColor, borderColor: accentColor }}
              >
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((edu, idx) => (
                  <div key={idx}>
                    <p className="font-bold text-gray-900">
                      {edu.degree}
                      {edu.field && ` in ${edu.field}`}
                    </p>
                    <p className="text-gray-700">{edu.institution}</p>
                    {edu.graduation_year && (
                      <p className="text-sm text-gray-600">
                        {edu.graduation_year}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects */}
        {Array.isArray(data.project) && data.project.length > 0 && (
          <section className="mt-8">
            <h2
              className="text-lg font-bold uppercase tracking-wide mb-4 pb-2 border-b-2"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Projects
            </h2>
            <div className="space-y-4">
              {data.project.map((proj, idx) => (
                <div key={idx}>
                  <h3 className="text-base font-bold text-gray-900">
                    {proj.name}
                  </h3>
                  {/* Project Type */}
                  {proj.type && (
                    <p className="text-sm mt-1" style={{ color: accentColor }}>
                      {proj.type}
                    </p>
                  )}
                  {proj.description && (
                    <p className="text-gray-700 leading-relaxed mt-1">
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

export default ExecutiveTemplate;
