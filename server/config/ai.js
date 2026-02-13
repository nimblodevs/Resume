import OpenAI from "openai";

// Ensure API key exists
if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not defined in environment variables");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  ...(process.env.OPENAI_BASE_URL && {
    baseURL: process.env.OPENAI_BASE_URL,
  }),
});

export default openai;
