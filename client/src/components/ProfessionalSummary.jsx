import React, { useState, useEffect } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ProfessionalSummary = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);

  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeData, setResumeData] = useState({
    professional_summary: data || "",
  });

  const [charCount, setCharCount] = useState(data?.length || 0);

  // Sync prop → local state
  useEffect(() => {
    setResumeData({ professional_summary: data || "" });
    setCharCount(data?.length || 0);
  }, [data]);

  const generateSummary = async () => {
    if (
      !resumeData.professional_summary ||
      resumeData.professional_summary.length < 20
    ) {
      toast.error("Please write at least a short summary before enhancing.");
      return;
    }

    try {
      setIsGenerating(true);

      const prompt = `Enhance my professional summary:

      ${resumeData.professional_summary}
      
      Write 4–5 well-developed sentences.
      Each sentence MUST end with a period (.).
      The final summary MUST be at least 300 characters.
      Highlight key skills, experience, measurable impact, and career goals.
      Make the summary ATS-friendly and compelling.
      Return ONLY the final formatted paragraph.`;

      const response = await api.post(
        "/api/ai/enhance-pro-sum",
        { userContent: prompt },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ Maintaining your required logic
      setResumeData((prev) => ({
        ...prev,
        professional_summary: response.data.enhancedContent,
      }));

      // Also update parent state
      onChange(response.data.enhancedContent);

      setCharCount(response.data.enhancedContent.length);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setResumeData((prev) => ({
      ...prev,
      professional_summary: value,
    }));

    setCharCount(value.length);
    onChange(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add summary for your resume here
          </p>
        </div>

        <button
          disabled={isGenerating}
          onClick={generateSummary}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100
          text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <div className="mt-6 space-y-1">
        <textarea
          value={resumeData.professional_summary}
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
