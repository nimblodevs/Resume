import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Briefcase,
  GraduationCap,
  Code,
} from "lucide-react";

const InfographicTemplate = ({ data, accentColor = "#2563eb" }) => {
  const info = data.personal_info || {};

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  // Helper: render contact item
  const ContactItem = ({ icon: Icon, children, href }) => (
    <div className="flex items-center text-gray-600 text-sm">
      <Icon
        size={14}
        className="mr-1.5 flex-shrink-0"
        style={{ color: accentColor }}
      />
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {children}
        </a>
      ) : (
        children
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 font-sans p-6 md:p-8">
      {/* Header: Name + Contact */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {info.full_name || "Your Name"}
            </h1>
            {info.profession && (
              <p className="text-gray-600 mt-1 text-base">{info.profession}</p>
            )}
          </div>

          <div className="mt-3 md:mt-0 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {info.email && <ContactItem icon={Mail}>{info.email}</ContactItem>}
            {info.phone && <ContactItem icon={Phone}>{info.phone}</ContactItem>}
            {info.location && (
              <ContactItem icon={MapPin}>{info.location}</ContactItem>
            )}
            {info.linkedin && (
              <ContactItem icon={Linkedin} href={info.linkedin}>
                LinkedIn
              </ContactItem>
            )}
            {info.website && (
              <ContactItem icon={Globe} href={info.website}>
                Portfolio
              </ContactItem>
            )}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Summary, Skills, Education */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Professional Summary */}
          {data.professional_summary && (
            <section>
              <h2
                className="font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3"
                style={{ color: accentColor }}
              >
                Summary
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {data.professional_summary}
              </p>
            </section>
          )}

          {/* Skills */}
          {Array.isArray(data.skills) && data.skills.length > 0 && (
            <section>
              <h2
                className="font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3"
                style={{ color: accentColor }}
              >
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.slice(0, 12).map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded"
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
                className="font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3"
                style={{ color: accentColor }}
              >
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((edu, idx) => (
                  <div key={idx}>
                    <div className="font-semibold text-gray-900">
                      {edu.degree}
                    </div>
                    {edu.field && (
                      <div className="text-sm text-gray-600">{edu.field}</div>
                    )}
                    <div className="text-sm text-gray-700">
                      {edu.institution}
                    </div>
                    {edu.graduation_year && (
                      <div className="text-xs text-gray-500">
                        {edu.graduation_year}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Right Column: Experience & Projects */}
        <main className="lg:col-span-2 space-y-7">
          {/* Experience */}
          {Array.isArray(data.experience) && data.experience.length > 0 && (
            <section>
              <h2
                className="font-bold text-gray-900 text-lg mb-4 pb-1 border-b border-gray-300"
                style={{ color: accentColor }}
              >
                Professional Experience
              </h2>
              <div className="space-y-5">
                {data.experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex flex-wrap justify-between">
                      <div>
                        <div className="font-bold text-gray-900">
                          {exp.position}
                        </div>
                        <div
                          className="font-medium"
                          style={{ color: accentColor }}
                        >
                          {exp.company}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 whitespace-nowrap mt-0.5">
                        {formatDate(exp.start_date)} –{" "}
                        {exp.is_Current ? "Present" : formatDate(exp.end_date)}
                      </div>
                    </div>
                    {exp.description && (
                      <div className="mt-2 text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                        {exp.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects (optional, keep concise) */}
          {Array.isArray(data.project) && data.project.length > 0 && (
            <section>
              <h2
                className="font-bold text-gray-900 text-lg mb-4 pb-1 border-b border-gray-300"
                style={{ color: accentColor }}
              >
                Key Projects
              </h2>
              <div className="space-y-4">
                {data.project.map((proj, idx) => (
                  <div key={idx}>
                    <div className="font-semibold text-gray-900">
                      {proj.name}
                    </div>
                    {/* Project Type */}
                    {proj.type && (
                      <div
                        className="text-sm mt-1"
                        style={{ color: accentColor }}
                      >
                        {proj.type}
                      </div>
                    )}
                    {proj.description && (
                      <div className="text-gray-700 text-sm mt-1">
                        {proj.description}
                      </div>
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

export default InfographicTemplate;
