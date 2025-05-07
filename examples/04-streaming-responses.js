import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const response = await ai.models.generateContentStream({
  model: "gemini-2.0-flash",
  contents: "What is a laser?",
});

for await (const chunk of response) {
  console.log(chunk.text);
}
