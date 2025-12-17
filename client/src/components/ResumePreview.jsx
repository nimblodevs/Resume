import React from "react";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import StartupTemplate from "./templates/StartupTemplate";
import InfographicTemplate from "./templates/InfographicTemplate";
import DesignerTemplate from "./templates/DesignerTemplate";
import TechTemplate from "./templates/TechTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
// New templates
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
        className={`border border-gray-200 print:shadow-none print:border-none ${classes}`}
      >
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
