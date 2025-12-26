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
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an expert resume writer.Enhance the 
          professional summary of a resume.Return 1–2 concise sentences 
          highlighting key skills,experience, and career objectives.Make it 
          compelling and ATS-friendly.Return ONLY the enhanced text.
          `,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      temperature: 0.7,
      max_tokens: 120,
    });

    const enhancedContent = response.choices?.[0]?.message?.content?.trim();

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
    res.status(500).json({
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
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an expert resume writer.Enhance the job description 
          section of a resume.Return 1–2 concise sentences highlighting key 
          responsibilities,achievements, and measurable impact.Use action verbs 
          and quantifiable results where possible.Make it ATS-friendly.Return 
          ONLY the enhanced text.`,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const enhancedContent = response.choices?.[0]?.message?.content?.trim();

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
    res.status(500).json({
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

    // Basic validation
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!resumeText || !title) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const systemPrompt =
      "You are a strict resume parser. Extract only information explicitly present in the resume. Do not guess or invent data.";

    const userPrompt = `Extract structured data from the following resume text.

Resume:
${resumeText}

Return ONLY valid JSON with NO additional text.
Use this exact structure:

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
}
`;

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
      });
    }

    const newResume = await Resume.create({
      userId,
      title,
      professional_summary: parsedData.professional_summary,
      personal_info: parsedData.personal_info,
      experience: parsedData.experience,
      projects: parsedData.projects,
      education: parsedData.education,
    });

    return res.status(200).json({
      status: "success",
      resumeId: newResume._id,
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
