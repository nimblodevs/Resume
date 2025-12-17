import { Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react";

const TechTemplate = ({ data, accentColor }) => {
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
    <div className="max-w-4xl mx-auto bg-white text-gray-800">
      {/* Header */}
      <header
        className="p-8 text-white"
        style={{ backgroundColor: accentColor }}
      >
        <h1 className="text-4xl font-bold mb-1">
          {info.full_name || "Your Name"}
        </h1>
        {info.profession && (
          <p className="text-lg opacity-90">{info.profession}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-sm">
          {info.email && (
            <div className="flex items-center gap-2">
              <Mail size={16} />
              {info.email}
            </div>
          )}
          {info.phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} />
              {info.phone}
            </div>
          )}
          {info.location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              {info.location}
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
          {info.github && (
            <a
              href={info.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github size={16} /> {formatLink(info.github)}
            </a>
          )}
        </div>
      </header>

      <div className="p-8">
        {/* Professional Summary */}
        {data.professional_summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200">
              Summary
            </h2>
            <p className="text-gray-700">{data.professional_summary}</p>
          </section>
        )}

        {/* Experience */}
        {Array.isArray(data.experience) && data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200">
              Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="pl-4 border-l-4"
                  style={{ borderColor: accentColor }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">
                        {exp.position}
                      </h3>
                      <p className="text-gray-700 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(exp.start_date)} –{" "}
                      {exp.is_Current ? "Present" : formatDate(exp.end_date)}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 whitespace-pre-line">
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
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200">
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

        {/* Projects */}
        {Array.isArray(data.project) && data.project.length > 0 && (
          <section className="mt-6">
            <h2
              className="text-2xl font-semibold mb-4 border-b"
              style={{ borderColor: accentColor }}
            >
              Projects
            </h2>
            {/* Reduced spacing between projects */}
            <div className="space-y-2">
              {data.project.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-4 border-l-4"
                  style={{ borderColor: accentColor }}
                >
                  <div className="items-center justify-between flex-wrap">
                    {/* Project Name */}
                    <h3 className="text-lg font-medium text-gray-900">
                      {proj.name || "Project Name"}
                    </h3>

                    {/* Project Type */}
                    {proj.type && (
                      <span className="text-sm" style={{ color: accentColor }}>
                        {proj.type}
                      </span>
                    )}
                  </div>

                  {/* Project Description */}
                  {proj.description && (
                    <p className="text-gray-700 mt-2 whitespace-pre-line">
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

export default TechTemplate;
