import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const info = data.personal_info || {};

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
      {/* Header */}
      <header
        className="text-center mb-8 pb-6 border-b-2"
        style={{ borderColor: accentColor }}
      >
        <h1 className="text-3xl font-bold mb-1" style={{ color: accentColor }}>
          {info.full_name || "Your Name"}
        </h1>

        {info.profession && (
          <p className="text-md text-gray-700 tracking-wide mb-3">
            {info.profession}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {info.email && (
            <span className="flex items-center gap-1">
              <Mail className="size-4" />
              {info.email}
            </span>
          )}
          {info.phone && (
            <span className="flex items-center gap-1">
              <Phone className="size-4" />
              {info.phone}
            </span>
          )}
          {info.location && (
            <span className="flex items-center gap-1">
              <MapPin className="size-4" />
              {info.location}
            </span>
          )}
          {info.linkedin && (
            <span className="flex items-center gap-1 break-all">
              <Linkedin className="size-4" />
              {info.linkedin}
            </span>
          )}
          {info.website && (
            <span className="flex items-center gap-1 break-all">
              <Globe className="size-4" />
              {info.website}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {(data.professional_summary || info.professional_summary) && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: accentColor }}
          >
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700">
            {data.professional_summary || info.professional_summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {Array.isArray(data.experience) && data.experience.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-xs uppercase tracking-widest mb-6 font-semibold"
            style={{ color: accentColor }}
          >
            Experience
          </h2>

          {data.experience.map((experience, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between">
                <h3 className="font-medium text-gray-900">
                  {experience.position}
                </h3>

                <span className="text-xs text-gray-500">
                  {formatDate(experience.start_date)} –{" "}
                  {experience.is_Current
                    ? "Present"
                    : formatDate(experience.end_date)}
                </span>
              </div>

              <p className="text-sm text-gray-600">{experience.company}</p>

              {experience.description && (
                <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">
                  {experience.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {Array.isArray(data.project) && data.project.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            PROJECTS
          </h2>

          <ul className="space-y-3">
            {data.project.map((proj, index) => (
              <li key={index}>
                <h3 className="font-semibold">{proj.name}</h3>
                {proj.type && (
                  <p className="text-sm text-gray-600">{proj.type}</p>
                )}
                {proj.description && (
                  <p className="text-sm">{proj.description}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Education */}
      {Array.isArray(data.education) && data.education.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            EDUCATION
          </h2>

          <div className="space-y-3">
            {data.education.map((education, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">
                    {education.degree}
                    {education.field && ` in ${education.field}`}
                  </h3>
                  <p>{education.institution}</p>
                  {education.gpa && (
                    <p className="text-sm text-gray-500">
                      GPA: {education.gpa}
                    </p>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(education.graduation_date)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {Array.isArray(data.skills) && data.skills.length > 0 && (
        <section>
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            CORE SKILLS
          </h2>

          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, index) => (
              <span key={index}>• {skill}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
