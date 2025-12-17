const TimelineTemplate = ({ data, accentColor }) => {
  const info = data.personal_info || {};

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-light">{info.full_name || "Your Name"}</h1>

        {info.profession && (
          <p
            className="text-sm uppercase tracking-widest mt-2"
            style={{ color: accentColor }}
          >
            {info.profession}
          </p>
        )}
      </div>

      {data.professional_summary && (
        <section className="mb-12">
          <p className="text-gray-700 leading-relaxed">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* Experience Timeline */}
      {Array.isArray(data.experience) && data.experience.length > 0 && (
        <section
          className="relative pl-8 border-l-2"
          style={{ borderColor: accentColor }}
        >
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-10 relative">
              <div
                className="absolute -left-[9px] top-1 w-4 h-4 rounded-full"
                style={{ backgroundColor: accentColor }}
              />

              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{exp.position}</h3>
                <span className="text-xs text-gray-500">
                  {formatDate(exp.start_date)} –{" "}
                  {exp.is_Current ? "Present" : formatDate(exp.end_date)}
                </span>
              </div>

              <p className="text-sm font-medium" style={{ color: accentColor }}>
                {exp.company}
              </p>

              {exp.description && (
                <p className="text-gray-700 mt-2 whitespace-pre-line">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {Array.isArray(data.education) && data.education.length > 0 && (
        <section className="mt-12">
          <h2
            className="text-lg font-semibold mb-6"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          {data.education.map((edu, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-medium">
                  {edu.degree}
                  {edu.field && ` in ${edu.field}`}
                </h3>
                <span className="text-xs text-gray-500">
                  {formatDate(edu.graduation_date)}
                </span>
              </div>
              <p className="text-sm text-gray-600">{edu.institution}</p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {Array.isArray(data.project) && data.project.length > 0 && (
        <section className="mt-12">
          <h2
            className="text-lg font-semibold mb-6"
            style={{ color: accentColor }}
          >
            Projects
          </h2>

          {data.project.map((proj, i) => (
            <div key={i} className="mb-6">
              {/* Name and Type on One Line */}
              <div className="justify-between items-center">
                <h3 className="font-medium text-gray-900">
                  {proj.name || "Project Name"}
                </h3>
                {proj.type && (
                  <span className="text-sm" style={{ color: accentColor }}>
                    {proj.type}
                  </span>
                )}
              </div>

              {/* Description */}
              {proj.description && (
                <p className="text-gray-700 mt-2 whitespace-pre-line">
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

export default TimelineTemplate;
