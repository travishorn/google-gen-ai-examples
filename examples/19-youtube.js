import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: [
    "What if it rained bananas instead of water?",
    {
      fileData: {
        fileUri: "https://www.youtube.com/watch?v=tRXy-b6_lBc",
      },
    },
  ],
});

console.log(response.text);
