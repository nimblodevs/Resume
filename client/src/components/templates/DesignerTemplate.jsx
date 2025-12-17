import React from "react";
import { Mail, Phone, Linkedin, Globe } from "lucide-react";

const DesignerTemplate = ({ data, accentColor }) => {
  const info = data.personal_info || {};

  const formatLink = (url) => url?.replace(/^https?:\/\/(www\.)?/, "") || "";

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 font-sans shadow-lg">
      {/* Header */}
      <header
        className="p-8 text-white"
        style={{
          background: `linear-gradient(120deg, ${accentColor}60, ${accentColor}99)`,
        }}
      >
        <h1 className="text-4xl font-bold mb-1">
          {info.full_name || "Your Name"}
        </h1>
        {info.profession && (
          <p className="text-lg font-medium opacity-90">{info.profession}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-sm">
          {info.email && (
            <div className="flex items-center gap-2">
              <Mail size={16} /> {info.email}
            </div>
          )}
          {info.phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} /> {info.phone}
            </div>
          )}
          {info.linkedin && (
            <a
              href={info.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Linkedin size={16} /> {formatLink(info.linkedin)}
            </a>
          )}
          {info.website && (
            <a
              href={info.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Globe size={16} /> {formatLink(info.website)}
            </a>
          )}
        </div>
      </header>

      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Skills & Education */}
        <aside className="md:col-span-1 space-y-6">
          {data.skills?.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold mb-2"
                style={{ color: accentColor }}
              >
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-white text-sm"
                    style={{ backgroundColor: accentColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.education?.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold mb-2"
                style={{ color: accentColor }}
              >
                Education
              </h2>
              <ul className="text-gray-700 text-sm space-y-2">
                {data.education.map((edu, idx) => (
                  <li key={idx}>
                    <p className="font-medium">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </p>
                    <p>{edu.institution}</p>
                    {edu.graduation_date && (
                      <p className="text-sm text-gray-500">
                        {formatDate(edu.graduation_date)}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* Right Column: Projects & Experience */}
        <main className="md:col-span-2 space-y-6">
          {data.project?.length > 0 && (
            <section>
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: accentColor }}
              >
                Projects
              </h2>
              <div className="space-y-4">
                {data.project.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-4 border-l-4"
                    style={{ borderColor: accentColor }}
                  >
                    <h3 className="text-lg font-medium">{proj.name}</h3>
                    {proj.type && (
                      <p className="text-sm text-indigo-600">{proj.type}</p>
                    )}
                    {proj.description && (
                      <p className="text-gray-700 mt-1">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.experience?.length > 0 && (
            <section>
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: accentColor }}
              >
                Experience
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-4 border-l-4"
                    style={{ borderColor: accentColor }}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="text-lg font-medium">{exp.position}</h3>
                        <p className="text-gray-700 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDate(exp.start_date)} –{" "}
                        {exp.is_Current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default DesignerTemplate;
