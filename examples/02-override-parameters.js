import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: "What is a laser?",
  config: {
    maxOutputTokens: 500,
    temperature: 0.1,
    // More config options: https://ai.google.dev/api/generate-content#v1beta.GenerationConfig
  },
});

console.log(response.text);
