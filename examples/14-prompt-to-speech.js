import "dotenv/config";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { GoogleGenAI } from "@google/genai";
import { saveWaveFile } from "../lib/saveWaveFile.js";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const transcript = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents:
    "Generate a short transcript around 100 words that reads like it was clipped from a podcast by excited herpetologists. The hosts names are Dr. Anya and Liam.",
});

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash-preview-tts",
  contents: transcript,
  config: {
    responseModalities: ["AUDIO"],
    speechConfig: {
      multiSpeakerVoiceConfig: {
        speakerVoiceConfigs: [
          {
            speaker: "Dr. Anya",
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Kore" },
            },
          },
          {
            speaker: "Liam",
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Puck" },
            },
          },
        ],
      },
    },
  },
});

const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
const audioBuffer = Buffer.from(data, "base64");

const outputDir = join(import.meta.dirname, "../output");
const outputPath = join(outputDir, "podcast.wav");
if (!existsSync(outputDir)) mkdirSync(outputDir);
await saveWaveFile(outputPath, audioBuffer);

console.log(`Audio saved as ${outputPath}`);
