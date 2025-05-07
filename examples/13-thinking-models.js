import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash-preview-04-17",
  contents: "How can we use AI to improve our lives?",
  config: {
    thinkingConfig: {
      // Gemini 2.5 models automatically decide when and how much to think based on the prompt.
      // You can limit or disable thinking with the thinkingBudget parameter.
      thinkingBudget: 0, // 0-24576
    },
  },
});

console.log(response.text);
