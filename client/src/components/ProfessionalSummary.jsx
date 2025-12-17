import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

const ProfessionalSummary = ({ data, onChange }) => {
  const [charCount, setCharCount] = useState(data?.length || 0);

  useEffect(() => {
    setCharCount(data?.length || 0);
  }, [data]);

  const handleChange = (e) => {
    const value = e.target.value;
    setCharCount(value.length);
    onChange(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add summary for your resume here
          </p>
        </div>
        {/* Right Side */}
        <button
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100
          text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
        >
          <Sparkles className="size-4" />
          AI Enhance
        </button>
      </div>

      <div className="mt-6 space-y-1">
        <textarea
          value={data || ""}
          onChange={handleChange}
          rows={7}
          className="w-full p-3 border text-sm border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 outline-none transition-colors resize-none"
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span className="max-w-4/5 mx-auto text-center">
            Tip: Keep it concise (3-4 sentences) and focus on your most relevant
            achievements and skills.
          </span>
          <span>{charCount} characters</span>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSummary;
