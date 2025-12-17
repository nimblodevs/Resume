import React from "react";

const TechModernTemplate = ({ data, accentColor }) => {
  const info = data.personal_info || {};

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 font-light">
      <header className="p-8 bg-gray-100">
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
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {info.email && <span>{info.email}</span>}
          {info.phone && <span>{info.phone}</span>}
          {info.linkedin && <span>{info.linkedin}</span>}
          {info.website && <span>{info.website}</span>}
        </div>
      </header>

      {data.professional_summary && (
        <section className="p-8 border-t border-gray-200">
          <h2
            className="text-2xl font-semibold mb-2"
            style={{ color: accentColor }}
          >
            Summary
          </h2>
          <p className="text-gray-700">{data.professional_summary}</p>
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
              <h3 className="text-lg font-medium">
                {exp.position} - {exp.company}
              </h3>
              <span className="text-sm text-gray-500">
                {exp.start_date} - {exp.is_Current ? "Present" : exp.end_date}
              </span>
              {exp.description && (
                <p className="text-gray-700 mt-1 whitespace-pre-line">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <section className="p-8 border-t border-gray-200">
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
              {edu.graduation_date && (
                <span className="text-xs text-gray-500">
                  {edu.graduation_date}
                </span>
              )}
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
              <h3 className="text-lg font-medium">{proj.name}</h3>
              <h3 className="text-sm text-gray-500 mt-1">{proj.type}</h3>
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

export default TechModernTemplate;
