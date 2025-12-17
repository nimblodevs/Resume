const ElegantTemplate = ({ data, accentColor }) => {
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
    <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-xl shadow-sm">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-light text-gray-900">
          {info.full_name || "Your Name"}
        </h1>

        {info.profession && (
          <p
            className="mt-2 text-sm uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            {info.profession}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-600">
          {info.email && <span>{info.email}</span>}
          {info.phone && <span>{info.phone}</span>}
          {info.location && <span>{info.location}</span>}
        </div>
      </div>

      {data.professional_summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <section className="bg-white p-4 rounded-xl border">
            <p className="text-gray-700 leading-relaxed">
              {data.professional_summary}
            </p>
          </section>
        </div>
      )}

      {/* Experience */}
      {Array.isArray(data.experience) && data.experience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-2">Experience</h2>

          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border">
                <div className="flex justify-between">
                  <h3 className="font-medium">{exp.position}</h3>
                  <span className="text-xs text-gray-500">
                    {formatDate(exp.start_date)} –{" "}
                    {exp.is_Current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>

                <p
                  className="text-sm font-medium mt-1"
                  style={{ color: accentColor }}
                >
                  {exp.company}
                </p>

                {exp.description && (
                  <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {Array.isArray(data.skills) && data.skills.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs rounded-full border"
                style={{
                  borderColor: accentColor,
                  color: accentColor,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {Array.isArray(data.education) && data.education.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-2">Education</h2>

          <div className="space-y-6">
            {data.education.map((edu, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border">
                <div className="flex justify-between">
                  <h3 className="font-medium">
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {formatDate(edu.graduation_date)}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-1">{edu.institution}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {Array.isArray(data.project) && data.project.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-2">Projects</h2>

          <div className="space-y-6">
            {data.project.map((proj, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl border hover:shadow-md transition-shadow"
              >
                {/* Project Name */}
                <h3 className="font-medium text-gray-900">{proj.name}</h3>

                {/* Project Type */}
                {proj.type && (
                  <p className="text-sm mt-1" style={{ color: accentColor }}>
                    {proj.type}
                  </p>
                )}

                {/* Project Description */}
                {proj.description && (
                  <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ElegantTemplate;
