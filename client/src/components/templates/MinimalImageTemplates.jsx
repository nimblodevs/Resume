import { Mail, Phone, MapPin } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const info = data.personal_info || {};

  const getImageUrl = () => {
    if (!info.image) return null;
    if (typeof info.image === "string") return info.image;
    if (info.image instanceof File) return URL.createObjectURL(info.image);
    return null;
  };

  const imageUrl = getImageUrl();

  return (
    <div className="max-w-5xl mx-auto bg-white text-zinc-800">
      <div className="grid grid-cols-3">
        {/* Image */}
        <div className="col-span-1 py-10 flex justify-center">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full"
              style={{ background: `${accentColor}70` }}
            />
          )}
        </div>

        {/* Name */}
        <div className="col-span-2 flex flex-col justify-center py-10 px-8">
          <h1 className="text-4xl font-bold tracking-widest text-zinc-700">
            {info.full_name || "Your Name"}
          </h1>
          {info.profession && (
            <p className="uppercase text-zinc-600 text-sm tracking-widest">
              {info.profession}
            </p>
          )}
        </div>

        {/* Left Sidebar */}
        <aside className="col-span-1 border-r border-zinc-300 p-6">
          <Section title="Contact">
            {info.phone && <ContactRow icon={Phone} text={info.phone} />}
            {info.email && <ContactRow icon={Mail} text={info.email} />}
            {info.location && <ContactRow icon={MapPin} text={info.location} />}
          </Section>

          {data.education?.length > 0 && (
            <Section title="Education">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <p className="font-semibold uppercase">{edu.degree}</p>
                  <p className="text-zinc-600">{edu.institution}</p>
                  <p className="text-xs text-zinc-500">
                    {formatDate(edu.graduation_date)}
                  </p>
                </div>
              ))}
            </Section>
          )}

          {data.skills?.length > 0 && (
            <Section title="Skills">
              <ul className="space-y-1 text-sm">
                {data.skills.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </Section>
          )}
        </aside>

        {/* Main Content */}
        <main className="col-span-2 p-8">
          {data.professional_summary && (
            <Section title="Summary" color={accentColor}>
              <p>{data.professional_summary}</p>
            </Section>
          )}

          {data.experience?.length > 0 && (
            <Section title="Experience" color={accentColor}>
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{exp.position}</h3>
                    <span className="text-xs text-zinc-500">
                      {formatDate(exp.start_date)} –{" "}
                      {exp.is_Current ? "Present" : formatDate(exp.end_date)}
                    </span>
                  </div>

                  <p className="text-sm" style={{ color: accentColor }}>
                    {exp.company}
                  </p>

                  {exp.description && (
                    <ul className="list-disc list-inside text-sm">
                      {exp.description.split("\n").map((l, i) => (
                        <li key={i}>{l}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </Section>
          )}

          {data.project?.length > 0 && (
            <Section title="Projects" color={accentColor}>
              {data.project.map((proj, i) => (
                <div key={i}>
                  <h3 className="font-medium">{proj.name}</h3>
                  {proj.type && (
                    <p style={{ color: accentColor }}>{proj.type}</p>
                  )}
                  {proj.description && (
                    <p className="text-sm">{proj.description}</p>
                  )}
                </div>
              ))}
            </Section>
          )}
        </main>
      </div>
    </div>
  );
};

const Section = ({ title, color, children }) => (
  <section className="mb-8">
    <h2
      className="text-sm font-semibold tracking-widest mb-3 uppercase"
      style={{ color }}
    >
      {title}
    </h2>
    {children}
  </section>
);

const ContactRow = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2 text-sm">
    <Icon size={14} />
    <span>{text}</span>
  </div>
);

export default MinimalImageTemplate;
