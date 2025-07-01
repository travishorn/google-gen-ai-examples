import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: ["Which artists appear on the Barbie (2023) soundtrack?"],
  config: {
    tools: [{ googleSearch: {} }],
  },
});
console.log(response.text);

// Grounding metadata can be found in `response.candidates`.
// https://ai.google.dev/gemini-api/docs/grounding?lang=javascript#grounded-response
