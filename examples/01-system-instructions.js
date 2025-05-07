import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: "Tell me a bedtime story.",
  config: {
    systemInstruction: "You are a famous comedian from the 1990s.",
  },
});

console.log(response.text);
