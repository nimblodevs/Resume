import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import { Mail, Phone } from "lucide-react";

// New templates
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import StartupTemplate from "./templates/StartupTemplate";
import InfographicTemplate from "./templates/InfographicTemplate";
import DesignerTemplate from "./templates/DesignerTemplate";
import TechTemplate from "./templates/TechTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import TimelineTemplate from "./templates/TimelineTemplate";
import ElegantTemplate from "./templates/ElegantTemplate";
import TechModernTemplate from "./templates/TechModernTemplate";

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      case "startup":
        return <StartupTemplate data={data} accentColor={accentColor} />;
      case "creative":
        return <CreativeTemplate data={data} accentColor={accentColor} />;
      case "designer":
        return <DesignerTemplate data={data} accentColor={accentColor} />;
      case "infographic":
        return <InfographicTemplate data={data} accentColor={accentColor} />;
      case "tech":
        return <TechTemplate data={data} accentColor={accentColor} />;
      case "executive":
        return <ExecutiveTemplate data={data} accentColor={accentColor} />;
      case "timeline":
        return <TimelineTemplate data={data} accentColor={accentColor} />;
      case "elegant":
        return <ElegantTemplate data={data} accentColor={accentColor} />;
      case "tech-modern":
        return <TechModernTemplate data={data} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full bg-gray-100">
      <div
        id="resume-preview"
        className={
          "border border-gray-200 print:shadow-none print:border-none" + classes
        }
      >
        {renderTemplate()}
        {data?.referees?.length > 0 && (
          <section className="px-6 pb-6">
            <h2 className="text-lg font-semibold mb-3" style={{ color: accentColor }}>
              Referees
            </h2>
            <div className="space-y-2">
              {data.referees.map((referee, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-md p-3 text-sm text-gray-700"
                >
                  <p className="font-semibold text-gray-900">{referee.name}</p>
                  <p>
                    {[referee.position, referee.company].filter(Boolean).join(", ")}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-600">
                    {referee.email && (
                      <span className="inline-flex items-center gap-1">
                        <Mail className="size-3" /> {referee.email}
                      </span>
                    )}
                    {referee.phone && (
                      <span className="inline-flex items-center gap-1">
                        <Phone className="size-3" /> {referee.phone}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <style jsx="true">
        {`
          @page {
            size: letter;
            margin: 0;
          }

          @media print {
            html,
            body {
              width: 8.5in;
              height: 11in;
              overflow: hidden;
            }

            body * {
              visibility: hidden;
            }

            #resume-preview,
            #resume-preview * {
              visibility: visible;
            }

            #resume-preview {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: auto;
              margin: 0;
              padding: 0;
              box-shadow: none !important;
              border: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ResumePreview;
