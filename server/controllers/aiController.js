import openai from "../config/ai.js";
import Resume from "../models/ResumeModel.js";

/**
 * -----------------------------------
 * Enhance Professional Summary
 * POST: /api/ai/enhance-pro-sum
 * -----------------------------------
 */
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        status: "error",
        message: "❌ userContent is required",
      });
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gemini-1.5-flash",
      messages: [
        {
          role: "system",
          content: `
          You are a senior professional resume writer with expertise in ATS optimization.

          Rewrite and significantly enhance the provided professional summary.
          
          Write exactly 4–5 complete, well-developed sentences in paragraph form.
          Each sentence MUST end with a period (.).
          Do not use bullet points, fragments, or incomplete thoughts.
          Do not merge multiple ideas into one long run-on sentence.
          
          The final summary MUST be at least 300 characters in total length.
          
          Clearly highlight:
          - Core skills and competencies
          - Relevant experience
          - Measurable achievements or impact
          - Career objectives and value proposition
          
          Use strong action-oriented language, professional tone, and clear structure.
          Ensure proper grammar and punctuation throughout.
          
          Return ONLY the final polished paragraph with no additional commentary.
          
          `,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      temperature: 0.7,
      max_tokens: Number(process.env.AI_MAX_TOKENS) || 400,
    });

    const enhancedContent = response?.choices?.[0]?.message?.content?.trim();

    if (!enhancedContent) {
      return res.status(500).json({
        status: "error",
        message: "⚠️ AI failed to generate summary",
      });
    }

    return res.status(200).json({
      status: "success",
      enhancedContent,
    });
  } catch (error) {
    console.error("Enhance professional summary error:", error);

    return res.status(500).json({
      status: "error",
      message: "⚠️ Failed to enhance professional summary",
      error: error.message,
    });
  }
};

/**
 * -----------------------------------
 * Enhance Job Description
 * POST: /api/ai/enhance-job-desc
 * -----------------------------------
 */
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        status: "error",
        message: "❌ userContent is required",
      });
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gemini-1.5-flash",
      messages: [
        {
          role: "system",
          content: `
You are an expert resume writer.

Enhance and expand the job description section.
Write 6–7 well-developed sentences.
Each sentence MUST end with a period.
Use strong action verbs and measurable achievements.
Highlight responsibilities, impact, and results.
Make the content ATS-friendly.
Return ONLY the final formatted paragraph.
          `,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      temperature: 0.7,
      max_tokens: Number(process.env.AI_MAX_TOKENS) || 400,
    });

    const enhancedContent = response?.choices?.[0]?.message?.content?.trim();

    if (!enhancedContent) {
      return res.status(500).json({
        status: "error",
        message: "⚠️ AI failed to generate job description",
      });
    }

    return res.status(200).json({
      status: "success",
      enhancedContent,
    });
  } catch (error) {
    console.error("Enhance job description error:", error);

    return res.status(500).json({
      status: "error",
      message: "⚠️ Failed to enhance job description",
      error: error.message,
    });
  }
};

// Controller for uploading a resume to the database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!resumeText || !title)
      return res.status(400).json({ message: "Missing required fields" });

    // OpenAI prompts
    const systemPrompt =
      "You are a strict resume parser. Extract only information explicitly present in the resume. Do not guess or invent data.";
    const userPrompt = `Extract structured data from the following resume text.
Resume:
${resumeText}
Return ONLY valid JSON using this structure:
{
  "professional_summary": "",
  "personal_info": {
    "image": "",
    "full_name": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "projects": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}`;

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;

    let parsedData;
    try {
      parsedData = JSON.parse(content);
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: "AI returned invalid JSON",
        error: err.message,
      });
    }

    // --- Clean experience dates ---
    parsedData.experience = (parsedData.experience || []).map((exp) => {
      // Required fields fallback
      const company = exp.company || "Unknown Company";
      const position = exp.position || "Unknown Position";

      // Parse start_date safely
      const start_date = exp.start_date ? new Date(exp.start_date) : new Date();

      // Parse end_date or handle "Present"
      let end_date = null;
      let is_current = !!exp.is_current;

      if (exp.end_date && typeof exp.end_date === "string") {
        const str = exp.end_date.trim().toLowerCase();
        if (["present", "now", "current"].includes(str)) {
          end_date = null;
          is_current = true;
        } else {
          const parsedEnd = new Date(exp.end_date);
          end_date = isNaN(parsedEnd) ? null : parsedEnd;
        }
      } else if (exp.end_date instanceof Date) {
        end_date = exp.end_date;
      }

      return {
        company,
        position,
        start_date,
        end_date,
        description: exp.description || "",
        is_current,
      };
    });

    // --- Clean education dates ---
    parsedData.education = (parsedData.education || []).map((edu) => ({
      institution: edu.institution || "Unknown Institution",
      degree: edu.degree || "",
      field: edu.field || "",
      graduation_date: edu.graduation_date
        ? new Date(edu.graduation_date)
        : null,
      gpa: edu.gpa || "",
    }));

    // --- Ensure projects array ---
    parsedData.projects = (parsedData.projects || []).map((proj) => ({
      name: proj.name || "Unnamed Project",
      type: proj.type || "",
      description: proj.description || "",
    }));

    // --- Save to DB ---
    const newResume = await Resume.create({
      userId,
      title,
      professional_summary: parsedData.professional_summary || "",
      personal_info: parsedData.personal_info || {},
      experience: parsedData.experience,
      projects: parsedData.projects,
      education: parsedData.education,
    });

    // Return full resume object for frontend
    return res.status(200).json({
      status: "success",
      resume: newResume,
    });
  } catch (error) {
    console.error("Upload resume error:", error);
    return res.status(500).json({
      status: "error",
      message: "⚠️ Failed to upload resume",
      error: error.message,
    });
  }
};
