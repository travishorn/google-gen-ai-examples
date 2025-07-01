import "dotenv/config";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { GoogleGenAI } from "@google/genai";
import { saveWaveFile } from "../lib/saveWaveFile.js";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash-preview-tts",
  contents: [{ parts: [{ text: "Say cheerfully: Have a wonderful day!" }] }],
  config: {
    responseModalities: ["AUDIO"],
    speechConfig: {
      voiceConfig: {
        prebuiltVoiceConfig: { voiceName: "Kore" },
      },
    },
  },
});

const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
const audioBuffer = Buffer.from(data, "base64");

const outputDir = join(import.meta.dirname, "../output");
const outputPath = join(outputDir, "have-a-wonderful-day.wav");
if (!existsSync(outputDir)) mkdirSync(outputDir);
await saveWaveFile(outputPath, audioBuffer);

console.log(`Audio saved as ${outputPath}`);
