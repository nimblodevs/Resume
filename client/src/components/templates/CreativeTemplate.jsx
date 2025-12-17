import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const CreativeTemplate = ({ data, accentColor }) => {
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
    <div className="max-w-5xl mx-auto grid grid-cols-3 bg-white text-gray-800">
      {/* Sidebar */}
      <aside
        className="col-span-1 p-8 text-white"
        style={{ backgroundColor: accentColor }}
      >
        <h1 className="text-3xl font-light mb-2">
          {info.full_name || "Your Name"}
        </h1>
        {info.profession && (
          <p className="text-sm uppercase tracking-wide opacity-90">
            {info.profession}
          </p>
        )}

        <div className="mt-8 space-y-3 text-sm">
          {info.email && (
            <div className="flex items-center gap-2">
              <Mail size={14} /> {info.email}
            </div>
          )}
          {info.phone && (
            <div className="flex items-center gap-2">
              <Phone size={14} /> {info.phone}
            </div>
          )}
          {info.location && (
            <div className="flex items-center gap-2">
              <MapPin size={14} /> {info.location}
            </div>
          )}
          {info.website && (
            <div className="flex items-center gap-2">
              <Globe size={14} /> {info.website}
            </div>
          )}
          {info.linkedin && (
            <div className="flex items-center gap-2 break-all">
              <Linkedin size={14} /> {info.linkedin}
            </div>
          )}
        </div>

        {Array.isArray(data.skills) && data.skills.length > 0 && (
          <div className="mt-10">
            <h2 className="uppercase tracking-widest text-xs mb-3">Skills</h2>
            <div className="text-sm space-y-1">
              {data.skills.map((skill, i) => (
                <div key={i}>{skill}</div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="col-span-2 p-10">
        {data.professional_summary && (
          <section className="mb-10">
            <h2
              className="text-xs uppercase tracking-widest mb-4 font-semibold"
              style={{ color: accentColor }}
            >
              Profile
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {data.professional_summary}
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

            {data.experience.map((exp, i) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-900">{exp.position}</h3>
                  <span className="text-xs text-gray-500">
                    {formatDate(exp.start_date)} –{" "}
                    {exp.is_Current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{exp.company}</p>
                {exp.description && (
                  <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {Array.isArray(data.education) && data.education.length > 0 && (
          <section className="mb-10">
            <h2
              className="text-xs uppercase tracking-widest mb-6 font-semibold"
              style={{ color: accentColor }}
            >
              Education
            </h2>

            {data.education.map((edu, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium">
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
          <section className="mb-6">
            <h2
              className="text-xs uppercase tracking-widest mb-6 font-semibold"
              style={{ color: accentColor }}
            >
              Projects
            </h2>

            {data.project.map((proj, i) => (
              <div key={i} className="mb-6">
                {proj.name && (
                  <h3 className="font-medium text-gray-900">{proj.name}</h3>
                )}
                {proj.type && (
                  <p className="text-sm text-gray-600">{proj.type}</p>
                )}
                {proj.description && (
                  <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default CreativeTemplate;
