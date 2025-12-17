import React from "react";

const StartupTemplate = ({ data, accentColor }) => {
  const info = data.personal_info || {};

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 font-light border-2 border-dashed border-gray-300">
      <header className="p-8 bg-gradient-to-r from-green-100 to-blue-100">
        <h1 className="text-4xl font-bold mb-1">
          {info.full_name || "Your Name"}
        </h1>
        {info.profession && (
          <p
            className="text-lg font-medium mb-3"
            style={{ color: accentColor }}
          >
            {info.profession}
          </p>
        )}
      </header>

      {data.skills && data.skills.length > 0 && (
        <section className="p-8">
          <h2
            className="text-2xl font-semibold mb-2"
            style={{ color: accentColor }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: accentColor }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section className="p-8 border-t border-gray-200">
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            Experience
          </h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <h3 className="text-lg font-medium">{exp.position}</h3>
              <p className="text-sm font-medium" style={{ color: accentColor }}>
                {exp.company}
              </p>
              {exp.description && (
                <p className="text-gray-700 mt-1 whitespace-pre-line">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section className="p-8 border-t border-gray-200">
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            Education
          </h2>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-4">
              <h3 className="text-lg font-medium">
                {edu.degree}
                {edu.field && ` in ${edu.field}`}
              </h3>
              <p className="text-sm text-gray-600">{edu.institution}</p>
            </div>
          ))}
        </section>
      )}

      {data.project && data.project.length > 0 && (
        <section className="p-8 border-t border-gray-200">
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            Projects
          </h2>

          {data.project.map((proj, i) => (
            <div key={i} className="mb-4">
              {/* Project Name */}
              <h3 className="text-lg font-medium">
                {proj.name || "Project Name"}
              </h3>

              {/* Project Type */}
              {proj.type && (
                <p className="text-sm text-indigo-600 mt-1">{proj.type}</p>
              )}

              {/* Project Description */}
              {proj.description && (
                <p className="text-gray-700 mt-1 whitespace-pre-line">
                  {proj.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default StartupTemplate;
